import { NextRequest, NextResponse } from 'next/server';
import { LiveHashtagService } from '@/lib/liveHashtagService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    const forceRefresh = searchParams.get('refresh') === 'true';

    const liveService = LiveHashtagService.getInstance();
    
    // Get live trending hashtags
    const liveHashtags = await liveService.getAllTrendingHashtags(platform || undefined);

    // If force refresh, clear cache and fetch fresh data
    if (forceRefresh) {
      // Clear cache logic would go here
      const freshHashtags = await liveService.getAllTrendingHashtags(platform || undefined);
      return NextResponse.json({
        hashtags: freshHashtags,
        platform: platform || 'all',
        lastUpdated: new Date(),
        source: 'live_api',
        count: freshHashtags.length
      });
    }

    return NextResponse.json({
      hashtags: liveHashtags,
      platform: platform || 'all',
      lastUpdated: new Date(),
      source: 'live_api',
      count: liveHashtags.length
    });

  } catch (error: any) {
    console.error('Live hashtags API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live hashtags' },
      { status: 500 }
    );
  }
}

// POST endpoint to trigger manual refresh
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { platform, action } = body;

    const liveService = LiveHashtagService.getInstance();

    if (action === 'refresh') {
      const freshHashtags = await liveService.getAllTrendingHashtags(platform);
      
      return NextResponse.json({
        success: true,
        message: 'Hashtags refreshed successfully',
        hashtags: freshHashtags,
        count: freshHashtags.length
      });
    }

    if (action === 'suggest') {
      const { content, platform: targetPlatform } = body;
      const suggestions = await liveService.getHashtagSuggestions(content, targetPlatform);
      
      return NextResponse.json({
        success: true,
        suggestions,
        count: suggestions.length
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error: any) {
    console.error('Live hashtags POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
