import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const { mbtiType, zodiacSign } = await request.json();

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        error: { code: 'USER_NOT_FOUND', message: 'User not found' }
      }, { status: 404 });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(mbtiType && { mbtiType }),
        ...(zodiacSign && { zodiacSign })
      }
    });

    return NextResponse.json({
      success: true,
      data: {
        userId: updatedUser.id,
        mbtiType: updatedUser.mbtiType,
        zodiacSign: updatedUser.zodiacSign
      }
    });
  } catch (error) {
    console.error('Update tags error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to update tags' }
    }, { status: 500 });
  }
}

