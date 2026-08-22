import { Request, Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { AccessRequestStatus } from '@prisma/client';

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const profile = await prisma.patientProfile.findUnique({
      where: { userId },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    if (!profile) return res.status(404).json({ error: 'Profile not found' });

    res.json(profile);
  } catch (error) {
    console.error('Error fetching patient profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTreatments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    // Patients can only view CONFIRMED treatments
    const treatments = await prisma.treatment.findMany({
      where: { patientId: userId, status: 'CONFIRMED' },
      include: {
        doctor: { select: { name: true } },
        prescriptions: true,
        amendments: true,
      },
      orderBy: { confirmedAt: 'desc' },
    });

    res.json(treatments);
  } catch (error) {
    console.error('Error fetching patient treatments:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAccessRequests = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const requests = await prisma.historyAccessRequest.findMany({
      where: { patientId: userId },
      include: {
        doctor: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json(requests);
  } catch (error) {
    console.error('Error fetching access requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAccessRequest = async (req: AuthRequest, res: Response) => {
  try {
    const requestId = req.params.id as string;
    const userId = req.user!.id;
    const { status } = req.body;

    if (!['APPROVED', 'DENIED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be APPROVED or DENIED.' });
    }

    const request = await prisma.historyAccessRequest.findFirst({
      where: { id: requestId, patientId: userId },
    });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({ error: 'Can only update PENDING requests' });
    }

    let expiresAt = null;
    if (status === 'APPROVED') {
      // Grant access for 24 hours
      expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
    }

    const updatedRequest = await prisma.historyAccessRequest.update({
      where: { id: requestId },
      data: { status: status as AccessRequestStatus, expiresAt },
    });

    res.json({ message: `Access request ${status}`, request: updatedRequest });
  } catch (error) {
    console.error('Error updating access request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
