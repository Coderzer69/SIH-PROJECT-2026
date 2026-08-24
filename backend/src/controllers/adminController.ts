import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { DoctorVerificationStatus } from '@prisma/client';


export const getDoctors = async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as DoctorVerificationStatus | undefined;

    let whereClause: any = {};
    if (status) {
      whereClause.verificationStatus = status;
    } else {
      whereClause.verificationStatus = { not: DoctorVerificationStatus.INCOMPLETE };
    }

    const doctors = await prisma.doctorProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });

    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const verifyDoctor = async (req: AuthRequest, res: Response) => {
  try {
    const doctorProfileId = req.params.id as string;
    const { status } = req.body;

    if (!Object.values(DoctorVerificationStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid verification status' });
    }

    const doctor = await prisma.doctorProfile.update({
      where: { id: doctorProfileId },
      data: {
        verificationStatus: status,
        verifiedById: req.user?.id, // Admin ID who performed the action
      },
    });

    res.json({ message: `Doctor status updated to ${status}`, doctor });
  } catch (error: any) {
    console.error('Error verifying doctor:', error);
    require('fs').writeFileSync('backend-error.log', String(error) + '\n' + JSON.stringify(error, null, 2) + '\n' + error.stack);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const totalDoctors = await prisma.doctorProfile.count({
      where: { verificationStatus: { not: DoctorVerificationStatus.INCOMPLETE } }
    });
    const totalPatients = await prisma.patientProfile.count();
    const totalTreatments = await prisma.treatment.count();
    const pendingRequests = await prisma.historyAccessRequest.count({
      where: { status: 'PENDING' }
    });

    res.json({
      totalDoctors,
      totalPatients,
      totalTreatments,
      pendingRequests,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getPatients = async (req: AuthRequest, res: Response) => {
  try {
    const patients = await prisma.user.findMany({
      where: { role: 'PATIENT' },
      include: {
        patientProfile: true,
      },
    });

    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTreatments = async (req: AuthRequest, res: Response) => {
  try {
    const treatments = await prisma.treatment.findMany({
      include: {
        doctor: { select: { name: true, email: true } },
        patient: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(treatments);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getHistoryAccessRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.historyAccessRequest.findMany({
      include: {
        doctor: { select: { name: true, email: true } },
        patient: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(requests);
  } catch (error) {
    console.error('Error fetching history access requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAuditLogs = async (req: AuthRequest, res: Response) => {
  try {
    const logs = await prisma.auditLog.findMany({
      include: {
        user: { select: { name: true, email: true, role: true } },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
