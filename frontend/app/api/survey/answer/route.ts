import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionId, questionId, answer } = await request.json();

    // Validate
    if (!userId || !sessionId || questionId === undefined) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Missing required fields' }
      }, { status: 400 });
    }

    // Verify user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      }, { status: 404 });
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

    return NextResponse.json({
      success: true,
      message: 'Answer saved'
    });
  } catch (error) {
    console.error('Save answer error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to save answer' }
    }, { status: 500 });
  }
}

