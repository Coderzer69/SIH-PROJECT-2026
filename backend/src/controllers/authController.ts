import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

import prisma from '../utils/prisma';
import { generatePatientQrCodeId } from '../utils/qrGenerator';
import { Role } from '@prisma/client';

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// ==================== REGISTER ====================

export const register = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
      name,
      role,
      specialization,
      licenseNumber,
    } = req.body;

    if (!email || !password || !name || !role) {
      return res.status(400).json({
        error: 'Missing required fields',
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists',
      });
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

      // Create Patient Profile
      if (role === Role.PATIENT) {
        let unique = false;
        let qrCode = '';

        while (!unique) {
          qrCode = generatePatientQrCodeId();

          const existingQr =
            await prismaTx.patientProfile.findUnique({
              where: {
                qrCodeIdentifier: qrCode,
              },
            });

          if (!existingQr) {
            unique = true;
          }
        }

        await prismaTx.patientProfile.create({
          data: {
            userId: newUser.id,
            qrCodeIdentifier: qrCode,
          },
        });
      }

      // Create Doctor Profile
      else if (role === Role.DOCTOR) {
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

    let verificationStatus;
    let documentsSubmitted = false;
    if (role === Role.DOCTOR) {
      const doc = await prisma.doctorProfile.findUnique({ where: { userId: user.id } });
      verificationStatus = doc?.verificationStatus;
      documentsSubmitted = !!doc?.verificationDocumentUrl;
    }

    return res.status(201).json({
      message: 'User registered successfully',
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        ...(verificationStatus && { verificationStatus }),
        ...(role === Role.DOCTOR && { documentsSubmitted })
      }
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

// ==================== LOGIN ====================

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Missing required fields',
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { doctorProfile: true },
    });

    if (!user || !user.passwordHash) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid credentials',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h',
      }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        ...(user.doctorProfile && {
          verificationStatus: user.doctorProfile.verificationStatus,
          documentsSubmitted: !!user.doctorProfile.verificationDocumentUrl
        })
      },
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
};

// ==================== GOOGLE OAUTH LOGIN ====================

export const oauthLogin = async (req: Request, res: Response) => {
  try {
    const { credential, role } = req.body;

    // 1. Check Google credential
    if (!credential) {
      return res.status(400).json({
        error: 'Google credential is required',
      });
    }

    // 2. Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        error: 'Invalid Google token',
      });
    }

    // 3. Get verified Google account information
    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    // Make sure Google has verified the email
    if (!googleId || !email || payload.email_verified !== true) {
      return res.status(401).json({
        error: 'Invalid or unverified Google account',
      });
    }

    // 4. Find existing user
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { oauthId: googleId },
          { email: email },
        ],
      },
      include: { doctorProfile: true },
    });

    if (user && role && user.role !== role) {
      return res.status(400).json({
        error: `An account with this email already exists as a ${user.role.toLowerCase()}. Please log in or use a different account.`
      });
    }

    // ==================== NEW GOOGLE USER ====================

    if (!user) {
      // New Google users must select a role
      if (!role) {
        return res.status(400).json({
          error: 'Role is required for new OAuth registration',
        });
      }

      user = await prisma.$transaction(async (prismaTx: any) => {
        // Create user
        const newUser = await prismaTx.user.create({
          data: {
            email,
            name: name || 'Google User',
            role,
            oauthId: googleId,
            oauthProvider: 'google',
          },
        });

        // Create Patient Profile
        if (role === Role.PATIENT) {
          let unique = false;
          let qrCode = '';

          while (!unique) {
            qrCode = generatePatientQrCodeId();

            const existingQr =
              await prismaTx.patientProfile.findUnique({
                where: {
                  qrCodeIdentifier: qrCode,
                },
              });

            if (!existingQr) {
              unique = true;
            }
          }

          await prismaTx.patientProfile.create({
            data: {
              userId: newUser.id,
              qrCodeIdentifier: qrCode,
            },
          });
        }

        // Create Doctor Profile
        else if (role === Role.DOCTOR) {
          await prismaTx.doctorProfile.create({
            data: {
              userId: newUser.id,
            },
          });
        }

        const userWithProfile = await prismaTx.user.findUnique({
          where: { id: newUser.id },
          include: { doctorProfile: true },
        });

        return userWithProfile;
      });
    }

    // ==================== USER MUST EXIST HERE ====================

    if (!user) {
      return res.status(500).json({
        error: 'User could not be created or found',
      });
    }

    // ==================== GENERATE JWT ====================

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '24h',
      }
    );

    // ==================== RESPONSE ====================

    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
        ...(user.doctorProfile && {
          verificationStatus: user.doctorProfile.verificationStatus,
          documentsSubmitted: !!user.doctorProfile.verificationDocumentUrl
        })
      },
    });
  } catch (error) {
    console.error('OAuth Login error:', error);

    return res.status(401).json({
      error: 'Google authentication failed',
    });
  }
};