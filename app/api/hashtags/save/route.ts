import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Analytics from '@/models/Analytics';
import { getUserIdFromRequest } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { name, hashtags, platform, category } = await request.json();

    // Validation
    if (!name || !hashtags || !platform || !category) {
      return NextResponse.json(
        { error: 'Name, hashtags, platform, and category are required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(hashtags) || hashtags.length === 0) {
      return NextResponse.json(
        { error: 'Hashtags must be a non-empty array' },
        { status: 400 }
      );
    }

    if (!['facebook', 'instagram', 'youtube'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform' },
        { status: 400 }
      );
    }

    // Find user and add saved hashtag set
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if name already exists
    const existingSet = user.savedHashtags.find(set => set.name === name);
    if (existingSet) {
      return NextResponse.json(
        { error: 'A hashtag set with this name already exists' },
        { status: 409 }
      );
    }

    // Add new hashtag set
    const newHashtagSet = {
      name,
      hashtags,
      platform,
      category,
      createdAt: new Date()
    };

    user.savedHashtags.push(newHashtagSet);
    await user.save();

    // Log analytics
    await Analytics.create({
      userId,
      action: 'save',
      platform,
      category,
      hashtagCount: hashtags.length,
      timestamp: new Date()
    });

    return NextResponse.json({
      message: 'Hashtag set saved successfully',
      hashtagSet: newHashtagSet
    });

  } catch (error: any) {
    console.error('Save hashtags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).select('savedHashtags');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      savedHashtags: user.savedHashtags
    });

  } catch (error: any) {
    console.error('Get saved hashtags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await connectDB();
    
    const userId = getUserIdFromRequest(request);
    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const setId = searchParams.get('id');

    if (!setId) {
      return NextResponse.json(
        { error: 'Hashtag set ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Remove the hashtag set
    user.savedHashtags = user.savedHashtags.filter(
      set => set._id.toString() !== setId
    );
    
    await user.save();

    return NextResponse.json({
      message: 'Hashtag set deleted successfully'
    });

  } catch (error: any) {
    console.error('Delete hashtags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
