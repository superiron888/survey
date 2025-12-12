import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { INVESTMENT_SURVEY } from '../config/survey';

const router = Router();
const prisma = new PrismaClient();

const answerSchema = z.object({
  userId: z.string().uuid(),
  sessionId: z.string().uuid(),
  questionId: z.number().int().min(1).max(21),
  answer: z.any()
});

const submitSchema = z.object({
  userId: z.string().uuid(),
  sessionId: z.string().uuid()
});

// POST /api/v1/survey/answer
router.post('/answer', async (req, res) => {
  try {
    const { userId, sessionId, questionId, answer } = answerSchema.parse(req.body);

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        },
        timestamp: new Date().toISOString()
      });
    }

    // Upsert answer
    await prisma.surveyResponse.upsert({
      where: {
        sessionId_questionId: {
          sessionId,
          questionId
        }
      },
      update: {
        answer,
        answeredAt: new Date()
      },
      create: {
        userId,
        sessionId,
        questionId,
        answer
      }
    });

    res.json({
      success: true,
      message: 'Answer saved',
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

    console.error('Save answer error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to save answer'
      },
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/v1/survey/submit
router.post('/submit', async (req, res) => {
  try {
    const { userId, sessionId } = submitSchema.parse(req.body);

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'User not found'
        },
        timestamp: new Date().toISOString()
      });
    }

    // Get all responses
    const responses = await prisma.surveyResponse.findMany({
      where: { sessionId },
      orderBy: { questionId: 'asc' }
    });

    // Check required questions
    const requiredQuestions = INVESTMENT_SURVEY.questions
      .filter(q => q.required)
      .map(q => q.id);
    
    const answeredQuestions = responses.map(r => r.questionId);
    const missingQuestions = requiredQuestions.filter(qId => !answeredQuestions.includes(qId));

    if (missingQuestions.length > 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INCOMPLETE_SURVEY',
          message: 'Please complete all required questions',
          details: { missingQuestions }
        },
        timestamp: new Date().toISOString()
      });
    }

    // Create report record (Status: COMPLETED, but content is empty/pending manual review)
    await prisma.analysisReport.create({
      data: {
        userId,
        sessionId,
        reportContent: { status: 'pending_manual_review' },
        status: 'COMPLETED', // Process completed (data collected)
        emailSent: false
      }
    });

    // Return success immediately
    res.status(200).json({
      success: true,
      data: {
        sessionId,
        status: 'completed',
        message: 'Survey submitted successfully'
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

    console.error('Submit survey error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'SUBMIT_FAILED',
        message: 'Failed to submit survey'
      },
      timestamp: new Date().toISOString()
    });
  }
});

export default router;
