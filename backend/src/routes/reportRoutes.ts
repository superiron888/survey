import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/report/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

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
      return res.status(404).json({
        success: false,
        error: {
          code: 'REPORT_NOT_FOUND',
          message: 'Report not found'
        },
        timestamp: new Date().toISOString()
      });
    }

    if (report.status === 'GENERATING') {
      return res.status(202).json({
        success: true,
        data: {
          sessionId: report.sessionId,
          status: 'generating',
          message: 'Report is being generated, estimated 1-2 minutes'
        },
        timestamp: new Date().toISOString()
      });
    }

    if (report.status === 'FAILED') {
      return res.status(500).json({
        success: false,
        error: {
          code: 'GENERATION_FAILED',
          message: report.errorMessage || 'Report generation failed, please try again'
        },
        timestamp: new Date().toISOString()
      });
    }

    // Report is completed
    res.json({
      success: true,
      data: {
        sessionId: report.sessionId,
        status: 'completed',
        previewContent: report.previewContent,
        fullReportEmailSent: report.emailSent,
        generatedAt: report.generatedAt
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Get report error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to get report'
      },
      timestamp: new Date().toISOString()
    });
  }
});

// POST /api/v1/report/:sessionId/regenerate
router.post('/:sessionId/regenerate', async (req, res) => {
  try {
    const { sessionId } = req.params;

    const report = await prisma.analysisReport.findUnique({
      where: { sessionId },
      include: {
        user: true
      }
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'REPORT_NOT_FOUND',
          message: 'Report not found'
        },
        timestamp: new Date().toISOString()
      });
    }

    // Get responses
    const responses = await prisma.surveyResponse.findMany({
      where: { sessionId },
      orderBy: { questionId: 'asc' }
    });

    // Update status to generating
    await prisma.analysisReport.update({
      where: { sessionId },
      data: {
        status: 'GENERATING',
        errorMessage: null
      }
    });

    // Return immediately
    res.status(200).json({
      success: true,
      message: 'Report is pending manual review. Automatic regeneration is disabled.'
    });

  } catch (error) {
    console.error('Regenerate report error:', error);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Failed to regenerate report'
      },
      timestamp: new Date().toISOString()
    });
  }
});

export default router;

