import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient, UserType } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password, userType } = await request.json();

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        password: true,
        userType: true,
        createdAt: true,
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check user type if specified
    if (userType) {
      const expectedUserType = mapUserType(userType);
      if (user.userType !== expectedUserType) {
        return NextResponse.json(
          { error: `This account is not registered as a ${userType}` },
          { status: 403 }
        );
      }
    }

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    // Generate token
    const token = generateMockToken(user.id);

    return NextResponse.json({
      success: true,
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Fixed user type mapping function
function mapUserType(frontendType: string): UserType {
  const typeMap: { [key: string]: UserType } = {
    'athlete': UserType.ATHLETE,
    'coach': UserType.COACH,
    'team': UserType.TEAM_MANAGER,
    'club': UserType.CLUB_TRAINER
  };
  
  return typeMap[frontendType] || UserType.ATHLETE;
}

function generateMockToken(userId: string): string {
  return `mock-jwt-token-${userId}-${Date.now()}`;
}