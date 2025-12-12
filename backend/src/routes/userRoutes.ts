import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  entryPoint: z.enum(['MBTI', 'ZODIAC', 'CLASSIC'])
});

const updateTagsSchema = z.object({
  mbtiType: z.string().optional(),
  zodiacSign: z.string().optional()
}).refine(data => data.mbtiType || data.zodiacSign, {
  message: 'At least one tag must be provided'
});

// POST /api/v1/users/create
router.post('/create', async (req, res) => {
  try {
    const { email, entryPoint } = createUserSchema.parse(req.body);

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      // User exists, create new session
      const sessionId = crypto.randomUUID();
      return res.status(200).json({
        success: true,
        data: {
          userId: user.id,
          sessionId,
          email: user.email,
          entryPoint: user.entryPoint,
          createdAt: user.createdAt
        }
      });
    }

    // Create new user
    user = await prisma.user.create({
      data: {
        email,
        entryPoint
      }
    });

    const sessionId = crypto.randomUUID();

    res.status(201).json({
      success: true,
      data: {
        userId: user.id,
        sessionId,
        email: user.email,
        entryPoint: user.entryPoint,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.errors[0].message
        },
        timestamp: new Date().toISOString()
      });
    }

    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to create user'
      },
      timestamp: new Date().toISOString()
    });
  }
});

// PATCH /api/v1/users/:userId/tags
router.patch('/:userId/tags', async (req, res) => {
  try {
    const { userId } = req.params;
    const data = updateTagsSchema.parse(req.body);

    const updateData: any = {};
    if (data.mbtiType) updateData.mbtiType = data.mbtiType;
    if (data.zodiacSign) updateData.zodiacSign = data.zodiacSign;

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    res.json({
      success: true,
      data: {
        userId: user.id,
        mbtiType: user.mbtiType,
        zodiacSign: user.zodiacSign
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: error.errors[0].message
        },
        timestamp: new Date().toISOString()
      });
    }

    console.error('Update tags error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to update tags'
      },
      timestamp: new Date().toISOString()
    });
  }
});

export default router;

