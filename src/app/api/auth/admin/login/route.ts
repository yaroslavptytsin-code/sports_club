import { NextRequest, NextResponse } from 'next/server';
import { generateToken } from '@/lib/auth';

// Admin credentials (in production, store in environment variables)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: '7821'
};

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Check admin credentials
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      return NextResponse.json(
        { error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    // Generate admin token
    const token = generateToken('admin', 'admin@Movesbook.com', 'admin', 'ADMIN');

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: 'admin',
        name: 'System Administrator',
        username: 'admin',
        email: 'admin@Movesbook.com',
        userType: 'ADMIN'
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}