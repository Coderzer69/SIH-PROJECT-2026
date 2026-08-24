import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { TreatmentStatus } from '@prisma/client';
import OpenAI from 'openai';

// Helper to check if doctor is verified
const isDoctorVerified = async (userId: string) => {
  const profile = await prisma.doctorProfile.findUnique({ where: { userId } });
  return profile?.verificationStatus === 'APPROVED';
};

export const getPatients = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;

    // Get patients from treatments
    const treatments = await prisma.treatment.findMany({
      where: { doctorId },
      include: {
        patient: { select: { id: true, name: true, email: true } },
      },
    });

    // Get patients from access requests (approved or pending)
    const accessRequests = await prisma.historyAccessRequest.findMany({
      where: { doctorId },
      include: {
        patient: { select: { id: true, name: true, email: true } },
      },
    });

    const patientMap = new Map();
    
    treatments.forEach(t => {
      if (!patientMap.has(t.patient.id)) {
        patientMap.set(t.patient.id, t.patient);
      }
    });

    accessRequests.forEach(ar => {
      if (!patientMap.has(ar.patient.id)) {
        patientMap.set(ar.patient.id, ar.patient);
      }
    });

    // Get the patient profile for each patient to include QR code identifier
    const patients = Array.from(patientMap.values());
    const patientsWithProfile = await Promise.all(
      patients.map(async (p) => {
        const profile = await prisma.patientProfile.findUnique({ where: { userId: p.id } });
        return {
          ...p,
          qrCodeIdentifier: profile?.qrCodeIdentifier,
        };
      })
    );

    res.json(patientsWithProfile);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAccessRequests = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;
    const requests = await prisma.historyAccessRequest.findMany({
      where: { doctorId },
      include: {
        patient: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const requestsWithProfile = await Promise.all(
      requests.map(async (r) => {
        const profile = await prisma.patientProfile.findUnique({ where: { userId: r.patient.id } });
        return {
          ...r,
          patient: {
            ...r.patient,
            qrCodeIdentifier: profile?.qrCodeIdentifier,
          }
        };
      })
    );

    res.json(requestsWithProfile);
  } catch (error) {
    console.error('Error fetching access requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is missing in environment variables' });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
You are a medical assistant parsing transcribed voice notes from a doctor.
Extract the following information into a structured JSON format.
If a field is not mentioned, leave it as an empty string (or empty array for prescriptions).

JSON Schema:
{
  "condition": "The main medical condition or chief complaint",
  "symptoms": "Detailed symptoms mentioned",
  "diagnosis": "The doctor's diagnosis, if any",
  "doctorNotes": "Any other notes, observations, or advice",
  "prescriptions": [
    {
      "medicineName": "Name of the medicine",
      "strength": "Strength (e.g., 500mg)",
      "dosage": "Dosage (e.g., 1 tablet)",
      "frequency": "Frequency (e.g., twice a day)",
      "duration": "Duration (e.g., 5 days)",
      "route": "Route of administration (e.g., oral)",
      "instructions": "Specific instructions (e.g., after meals)"
    }
  ]
}

Transcribed Text:
"${text}"
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful medical assistant that outputs JSON only. Do not wrap with markdown blocks.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content returned from OpenAI');
    }

    const draftData = JSON.parse(content);

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

export const submitVerification = async (req: AuthRequest, res: Response) => {
  try {
    const doctorId = req.user!.id;
    const { licenseNumber, specialization, qualification, registrationYear, issuingAuthority } = req.body;
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    
    const licenseDoc = files['licenseDocument'] ? files['licenseDocument'][0].filename : null;
    const qualDoc = files['qualificationDocument'] ? files['qualificationDocument'][0].filename : null;

    if (!licenseNumber || !licenseDoc) {
      return res.status(400).json({ error: 'License number and license document are required' });
    }

    const updatedProfile = await prisma.doctorProfile.update({
      where: { userId: doctorId },
      data: {
        licenseNumber,
        specialization,
        verificationStatus: 'PENDING',
        // Since we didn't add qualification/registrationYear/issuingAuthority to schema, we just store what we have
        ...(licenseDoc && { verificationDocumentUrl: licenseDoc }),
        ...(qualDoc && { qualificationDocumentUrl: qualDoc }),
      },
    });

    res.json({ message: 'Verification documents submitted successfully', profile: updatedProfile });
  } catch (error) {
    console.error('Error submitting verification:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
