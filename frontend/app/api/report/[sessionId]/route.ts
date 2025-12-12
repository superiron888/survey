import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  try {
    const { sessionId } = await params;

    const report = await prisma.analysisReport.findUnique({
      where: { sessionId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            entryPoint: true,
            mbtiType: true,
            zodiacSign: true
          }
        }
      }
    });

    if (!report) {
      return NextResponse.json({
        success: false,
        error: { code: 'REPORT_NOT_FOUND', message: 'Report not found' }
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        sessionId: report.sessionId,
        status: report.status.toLowerCase(),
        previewContent: report.previewContent,
        fullReportEmailSent: report.emailSent,
        generatedAt: report.generatedAt
      }
    });
  } catch (error) {
    console.error('Get report error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to get report' }
    }, { status: 500 });
  }
}

