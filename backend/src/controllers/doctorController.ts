import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { TreatmentStatus } from '@prisma/client';

// Helper to check if doctor is verified
const isDoctorVerified = async (userId: string) => {
  const profile = await prisma.doctorProfile.findUnique({ where: { userId } });
  return profile?.verificationStatus === 'APPROVED';
};

export const scanPatientQr = async (req: AuthRequest, res: Response) => {
  try {
    const qrId = req.params.qrId as string;
    const patientProfile = await prisma.patientProfile.findUnique({
      where: { qrCodeIdentifier: qrId },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!patientProfile) {
      return res.status(404).json({ error: 'Patient not found for this QR code' });
    }

    res.json({
      patientId: patientProfile.user.id,
      name: patientProfile.user.name,
      qrIdentifier: patientProfile.qrCodeIdentifier
    });
  } catch (error) {
    console.error('Error scanning QR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const requestHistoryAccess = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;
    const { patientId } = req.body;

    if (!(await isDoctorVerified(doctorId))) {
      return res.status(403).json({ error: 'Only verified doctors can request history access' });
    }

    // Check if an active request already exists
    const existing = await prisma.historyAccessRequest.findFirst({
      where: {
        doctorId,
        patientId,
        status: 'APPROVED',
        expiresAt: { gt: new Date() },
      },
    });

    if (existing) {
      return res.status(400).json({ error: 'You already have active access to this patient\'s history' });
    }

    const request = await prisma.historyAccessRequest.create({
      data: {
        doctorId,
        patientId,
      },
    });

    res.status(201).json({ message: 'Access request sent to patient', request });
  } catch (error) {
    console.error('Error requesting history access:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPatientHistory = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;
    const patientId = req.params.id as string;

    if (!(await isDoctorVerified(doctorId))) {
      return res.status(403).json({ error: 'Only verified doctors can view history' });
    }

    const access = await prisma.historyAccessRequest.findFirst({
      where: {
        doctorId,
        patientId,
        status: 'APPROVED',
        expiresAt: { gt: new Date() },
      },
    });

    if (!access) {
      return res.status(403).json({ error: 'You do not have active permission to view this patient\'s history' });
    }

    // Log the access
    await prisma.auditLog.create({
      data: {
        userId: doctorId,
        action: 'VIEWED_PATIENT_HISTORY',
        details: { patientId },
      },
    });

    const treatments = await prisma.treatment.findMany({
      where: { patientId, status: 'CONFIRMED' },
      include: {
        doctor: { select: { name: true } },
        prescriptions: true,
        amendments: true,
      },
      orderBy: { confirmedAt: 'desc' },
    });

    res.json(treatments);
  } catch (error) {
    console.error('Error fetching patient history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const draftFromAudio = async (req: AuthRequest, res: Response) => {
  try {
    // This endpoint receives text (from speech-to-text API on the frontend)
    // and returns a structured JSON payload for the doctor to review.
    const { text } = req.body;

    // In a real implementation, this would call an LLM (like Gemini) to extract info.
    // For MVP, we'll provide a dummy parsed structure based on keywords or just return a generic structure.
    
    const draftData = {
      condition: "Extracted condition from text",
      symptoms: text,
      diagnosis: "Pending",
      doctorNotes: text,
      prescriptions: [
        {
          medicineName: "Extracted Medicine (Example: Paracetamol)",
          strength: "650mg",
          dosage: "1 tablet",
          frequency: "twice daily",
          duration: "3 days",
          instructions: "after food"
        }
      ]
    };

    res.json({ message: 'Structured data drafted. Please review before confirming.', data: draftData });
  } catch (error) {
    console.error('Error drafting from audio text:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTreatment = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;
    const { patientId, condition, symptoms, diagnosis, doctorNotes, status, prescriptions } = req.body;

    if (status === 'CONFIRMED' && !(await isDoctorVerified(doctorId))) {
      return res.status(403).json({ error: 'Only verified doctors can confirm treatments' });
    }

    const treatment = await prisma.$transaction(async (prismaTx: any) => {
      const newTreatment = await prismaTx.treatment.create({
        data: {
          doctorId,
          patientId,
          condition,
          symptoms,
          diagnosis,
          doctorNotes,
          status: status as TreatmentStatus || 'DRAFT',
          confirmedAt: status === 'CONFIRMED' ? new Date() : null,
        },
      });

      if (prescriptions && prescriptions.length > 0) {
        const presData = prescriptions.map((p: any) => ({
          treatmentId: newTreatment.id,
          medicineName: p.medicineName,
          strength: p.strength,
          dosage: p.dosage,
          frequency: p.frequency,
          duration: p.duration,
          route: p.route,
          instructions: p.instructions,
        }));
        await prismaTx.prescription.createMany({ data: presData });
      }

      return await prismaTx.treatment.findUnique({
        where: { id: newTreatment.id },
        include: { prescriptions: true },
      });
    });

    res.status(201).json(treatment);
  } catch (error) {
    console.error('Error creating treatment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const editTreatment = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;
    const treatmentId = req.params.id as string;
    const { condition, symptoms, diagnosis, doctorNotes, status, prescriptions, amendmentReason } = req.body;

    const existingTreatment = await prisma.treatment.findUnique({
      where: { id: treatmentId },
      include: { prescriptions: true },
    });

    if (!existingTreatment) return res.status(404).json({ error: 'Treatment not found' });
    if (existingTreatment.doctorId !== doctorId) return res.status(403).json({ error: 'Not authorized to edit this treatment' });

    if (existingTreatment.status === 'CONFIRMED') {
      if (!amendmentReason) {
        return res.status(400).json({ error: 'Amendment reason is required when editing a confirmed treatment' });
      }

      // Create an amendment record before updating
      await prisma.treatmentAmendment.create({
        data: {
          treatmentId,
          doctorId,
          reason: amendmentReason,
          previousData: JSON.parse(JSON.stringify(existingTreatment)),
          newData: { condition, symptoms, diagnosis, doctorNotes, prescriptions },
        },
      });
    }

    const updatedTreatment = await prisma.$transaction(async (prismaTx: any) => {
      // Update treatment details
      const updateData: any = { condition, symptoms, diagnosis, doctorNotes };
      if (status === 'CONFIRMED' && existingTreatment.status === 'DRAFT') {
        updateData.status = 'CONFIRMED';
        updateData.confirmedAt = new Date();
      }

      await prismaTx.treatment.update({
        where: { id: treatmentId },
        data: updateData,
      });

      // Update prescriptions (for simplicity, we delete existing and recreate them)
      if (prescriptions) {
        await prismaTx.prescription.deleteMany({ where: { treatmentId } });
        const presData = prescriptions.map((p: any) => ({
          treatmentId,
          medicineName: p.medicineName,
          strength: p.strength,
          dosage: p.dosage,
          frequency: p.frequency,
          duration: p.duration,
          route: p.route,
          instructions: p.instructions,
        }));
        await prismaTx.prescription.createMany({ data: presData });
      }

      return await prismaTx.treatment.findUnique({
        where: { id: treatmentId },
        include: { prescriptions: true, amendments: true },
      });
    });

    res.json({ message: 'Treatment updated successfully', treatment: updatedTreatment });
  } catch (error) {
    console.error('Error editing treatment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
