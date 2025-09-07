import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hashtag from '@/models/Hashtag';
import IndianFestival from '@/models/IndianFestival';
import Analytics from '@/models/Analytics';
import { getUserIdFromRequest } from '@/lib/auth';
import { getFestivalDateRange, getCurrentDate } from '@/lib/dateConfig';
import { HashtagGenerationRequest, HashtagGenerationResponse } from '@/types';

// Platform-specific hashtag limits
const PLATFORM_LIMITS = {
  instagram: 30,
  facebook: 10,
  youtube: 15,
  twitter: 5
};

// Indian context keywords for content analysis
const INDIAN_KEYWORDS = [
  'india', 'indian', 'delhi', 'mumbai', 'bangalore', 'chennai', 'kolkata',
  'hyderabad', 'pune', 'ahmedabad', 'jaipur', 'lucknow', 'kanpur',
  'bollywood', 'tollywood', 'kollywood', 'south indian', 'north indian',
  'gujarati', 'punjabi', 'bengali', 'tamil', 'telugu', 'kannada',
  'malayalam', 'hindi', 'marathi', 'odia', 'assamese', 'festival',
  'diwali', 'holi', 'dussehra', 'rakhi', 'karva chauth', 'navratri',
  'ganesh chaturthi', 'dussehra', 'ramadan', 'eid', 'christmas',
  'republic day', 'independence day', 'gandhi jayanti', 'teachers day',
  'childrens day', 'women day', 'mothers day', 'fathers day'
];

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body: HashtagGenerationRequest = await request.json();
    const userId = getUserIdFromRequest(request);

    const {
      content,
      platform,
      category,
      count = 20,
      includeTrending = true,
      includeIndianContext = true
    } = body;

    // Validation
    if (!content || !platform || !category) {
      return NextResponse.json(
        { error: 'Content, platform, and category are required' },
        { status: 400 }
      );
    }

    if (!['facebook', 'instagram', 'youtube', 'twitter'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform' },
        { status: 400 }
      );
    }

    // Check if content has Indian context
    const hasIndianContext = INDIAN_KEYWORDS.some(keyword => 
      content.toLowerCase().includes(keyword.toLowerCase())
    );

    // Get base hashtags for the category and platform
    const baseHashtags = await Hashtag.find({
      category,
      platforms: platform,
      language: 'en',
      $or: [
        { indianContext: false },
        ...(hasIndianContext ? [{ indianContext: true }] : [])
      ]
    })
    .sort({ popularity: -1, usageCount: -1 })
    .limit(count * 2);

    // Get trending hashtags
    let trendingHashtags: string[] = [];
    if (includeTrending) {
      const trending = await Hashtag.find({
        trending: true,
        platforms: platform,
        language: 'en'
      })
      .sort({ popularity: -1 })
      .limit(10)
      .select('tag');
      
      trendingHashtags = trending.map(h => h.tag);
    }

    // Get Indian context hashtags
    let indianContextHashtags: string[] = [];
    if (includeIndianContext && hasIndianContext) {
      const indianHashtags = await Hashtag.find({
        indianContext: true,
        platforms: platform,
        language: 'en'
      })
      .sort({ popularity: -1 })
      .limit(8)
      .select('tag');
      
      indianContextHashtags = indianHashtags.map(h => h.tag);
    }

    // Get current Indian festivals
    const { start, end } = getFestivalDateRange();
    const currentFestivals = await IndianFestival.find({
      date: {
        $gte: start,
        $lte: end
      },
      active: true
    });

    const festivalHashtags = currentFestivals.flatMap(festival => festival.hashtags);

    // Combine and deduplicate hashtags
    const allHashtags = [
      ...baseHashtags.map(h => h.tag),
      ...trendingHashtags,
      ...indianContextHashtags,
      ...festivalHashtags
    ];

    // Remove duplicates and limit to platform-specific count
    const uniqueHashtags = [...new Set(allHashtags)];
    const finalHashtags = uniqueHashtags.slice(0, Math.min(count, PLATFORM_LIMITS[platform as keyof typeof PLATFORM_LIMITS]));

    // Update usage count for used hashtags
    await Hashtag.updateMany(
      { tag: { $in: finalHashtags } },
      { $inc: { usageCount: 1 } }
    );

    // Log analytics
    if (userId) {
      await Analytics.create({
        userId,
        action: 'generate',
        platform,
        category,
        hashtagCount: finalHashtags.length,
        timestamp: getCurrentDate()
      });
    }

    const response: HashtagGenerationResponse = {
      hashtags: finalHashtags,
      trending: trendingHashtags,
      indianContext: indianContextHashtags,
      totalCount: finalHashtags.length,
      platform,
      category
    };

    return NextResponse.json(response);

  } catch (error: any) {
    console.error('Hashtag generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
