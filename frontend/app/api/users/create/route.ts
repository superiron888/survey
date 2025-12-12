import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const { email, entryPoint } = await request.json();

    // Validate
    if (!email || !entryPoint) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Email and entryPoint are required' }
      }, { status: 400 });
    }

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email }
    });

    const sessionId = uuidv4();

    if (user) {
      // Update existing user
      user = await prisma.user.update({
        where: { email },
        data: { entryPoint: entryPoint as any }
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          email,
          entryPoint: entryPoint as any
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        sessionId,
        email: user.email,
        entryPoint: user.entryPoint
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Failed to create user' }
    }, { status: 500 });
  }
}

