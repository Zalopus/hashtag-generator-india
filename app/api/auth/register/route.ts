import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { email, name, password } = await request.json();

    // Validation
    if (!email || !name || !password) {
      return NextResponse.json(
        { error: 'Email, name, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user
    const user = new User({
      email,
      name,
      password,
      preferences: {
        platforms: ['instagram'],
        categories: ['lifestyle', 'business', 'food', 'travel']
      },
      savedHashtags: []
    });

    await user.save();

    // Generate JWT token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name
    });

    // Return user data without password
    const userResponse = {
      _id: user._id,
      email: user.email,
      name: user.name,
      preferences: user.preferences,
      savedHashtags: user.savedHashtags,
      token
    };

    return NextResponse.json({
      message: 'User created successfully',
      user: userResponse
    }, { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
