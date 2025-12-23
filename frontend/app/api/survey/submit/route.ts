import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { userId, sessionId } = await request.json();

    // Validate
    if (!userId || !sessionId) {
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

    // Get all answers for this session
    const responses = await prisma.surveyResponse.findMany({
      where: { sessionId },
      orderBy: { questionId: 'asc' }
    });

    // Format answers as simple object: {"1": answer1, "2": answer2, ...}
    const answers: Record<string, any> = {};
    for (const response of responses) {
      answers[response.questionId.toString()] = response.answer;
    }

    // Save to simplified survey_submissions table
    await prisma.surveySubmission.create({
      data: {
        email: user.email,
        entryPoint: user.entryPoint,
        mbtiType: user.mbtiType,
        zodiacSign: user.zodiacSign,
        answers: answers
      }
    });

    // Create report record (Status: COMPLETED, pending manual review)
    await prisma.analysisReport.create({
      data: {
        userId,
        sessionId,
        reportContent: { status: 'pending_manual_review' },
        status: 'COMPLETED',
        emailSent: false
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        sessionId,
        status: 'completed',
        message: 'Survey submitted successfully'
      }
    });
  } catch (error) {
    console.error('Submit survey error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'SUBMIT_FAILED', message: 'Failed to submit survey' }
    }, { status: 500 });
  }
}

