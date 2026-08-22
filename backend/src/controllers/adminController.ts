import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { DoctorVerificationStatus } from '@prisma/client';

export const getDoctors = async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as DoctorVerificationStatus | undefined;

    const whereClause = status ? { verificationStatus: status } : {};

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
  } catch (error) {
    console.error('Error verifying doctor:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
