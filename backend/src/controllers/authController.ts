import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';
import { generatePatientQrCodeId } from '../utils/qrGenerator';
import { Role } from '@prisma/client';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role, specialization, licenseNumber } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.$transaction(async (prismaTx: any) => {
      const newUser = await prismaTx.user.create({
        data: {
          email,
          passwordHash,
          name,
          role,
        },
      });

      if (role === Role.PATIENT) {
        let unique = false;
        let qrCode = '';
        while (!unique) {
          qrCode = generatePatientQrCodeId();
          const existingQr = await prismaTx.patientProfile.findUnique({
            where: { qrCodeIdentifier: qrCode },
          });
          if (!existingQr) unique = true;
        }

        await prismaTx.patientProfile.create({
          data: {
            userId: newUser.id,
            qrCodeIdentifier: qrCode,
          },
        });
      } else if (role === Role.DOCTOR) {
        await prismaTx.doctorProfile.create({
          data: {
            userId: newUser.id,
            specialization,
            licenseNumber,
          },
        });
      }
      return newUser;
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const oauthLogin = async (req: Request, res: Response) => {
  try {
    const { email, name, role, oauthId, provider } = req.body;

    if (!email || !oauthId || !provider) {
      return res.status(400).json({ error: 'Missing required OAuth fields' });
    }

    let user = await prisma.user.findFirst({
      where: { OR: [{ oauthId }, { email }] },
    });

    if (!user) {
      if (!name || !role) {
        return res.status(400).json({ error: 'Name and role are required for new OAuth registration' });
      }

      user = await prisma.$transaction(async (prismaTx: any) => {
        const newUser = await prismaTx.user.create({
          data: {
            email,
            name,
            role,
            oauthId,
            oauthProvider: provider,
          },
        });

        if (role === Role.PATIENT) {
          let unique = false;
          let qrCode = '';
          while (!unique) {
            qrCode = generatePatientQrCodeId();
            const existingQr = await prismaTx.patientProfile.findUnique({
              where: { qrCodeIdentifier: qrCode },
            });
            if (!existingQr) unique = true;
          }
          await prismaTx.patientProfile.create({ data: { userId: newUser.id, qrCodeIdentifier: qrCode } });
        } else if (role === Role.DOCTOR) {
          await prismaTx.doctorProfile.create({ data: { userId: newUser.id } });
        }
        return newUser;
      });
    }

    const token = jwt.sign(
      { id: user!.id, role: user!.role, email: user!.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    res.json({ token, user: { id: user!.id, name: user!.name, role: user!.role } });
  } catch (error) {
    console.error('OAuth Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

