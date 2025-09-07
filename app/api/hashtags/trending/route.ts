import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hashtag from '@/models/Hashtag';
import IndianFestival from '@/models/IndianFestival';
import { getFestivalDateRange, getCurrentDate } from '@/lib/dateConfig';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform') || 'instagram';
    const limit = parseInt(searchParams.get('limit') || '20');

    // Validation
    if (!['facebook', 'instagram', 'youtube', 'twitter'].includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform' },
        { status: 400 }
      );
    }

    // Get trending hashtags
    const trendingHashtags = await Hashtag.find({
      trending: true,
      platforms: platform,
      language: 'en'
    })
    .sort({ popularity: -1, usageCount: -1 })
    .limit(limit)
    .select('tag category popularity usageCount indianContext');

    // Get current Indian festivals
    const { start, end } = getFestivalDateRange();
    const currentFestivals = await IndianFestival.find({
      date: {
        $gte: start,
        $lte: end
      },
      active: true
    })
    .select('name hashtags date description');

    // Get popular hashtags by category
    const categories = ['lifestyle', 'business', 'food', 'travel', 'fashion', 'beauty', 'fitness'];
    const popularByCategory = await Promise.all(
      categories.map(async (category) => {
        const hashtags = await Hashtag.find({
          category,
          platforms: platform,
          language: 'en'
        })
        .sort({ popularity: -1, usageCount: -1 })
        .limit(5)
        .select('tag popularity usageCount');
        
        return {
          category,
          hashtags: hashtags.map(h => ({
            tag: h.tag,
            popularity: h.popularity,
            usageCount: h.usageCount
          }))
        };
      })
    );

    return NextResponse.json({
      trending: trendingHashtags.map(h => ({
        tag: h.tag,
        category: h.category,
        popularity: h.popularity,
        usageCount: h.usageCount,
        indianContext: h.indianContext
      })),
      festivals: currentFestivals,
      popularByCategory: popularByCategory.filter(cat => cat.hashtags.length > 0),
      platform,
      lastUpdated: getCurrentDate()
    });

  } catch (error: any) {
    console.error('Get trending hashtags error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
