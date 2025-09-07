import { LiveHashtagData } from './liveHashtagAPIs';
import connectDB from './mongodb';
import Hashtag from '@/models/Hashtag';

// Live hashtag fetching service
export class LiveHashtagService {
  private static instance: LiveHashtagService;
  private cache: Map<string, LiveHashtagData[]> = new Map();
  private lastUpdate: Map<string, number> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  static getInstance(): LiveHashtagService {
    if (!LiveHashtagService.instance) {
      LiveHashtagService.instance = new LiveHashtagService();
    }
    return LiveHashtagService.instance;
  }

  // Fetch trending hashtags from Twitter API
  async fetchTwitterTrending(): Promise<LiveHashtagData[]> {
    try {
      // Check if API key is available
      if (!process.env.TWITTER_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN === 'your_twitter_bearer_token_here') {
        console.log('Twitter API key not configured, using fallback data');
        return this.getFallbackTwitterData();
      }

      console.log('Attempting to fetch Twitter trends...');
      
      const response = await fetch(
        `https://api.twitter.com/2/trends/by/woeid/23424848`, // India WOEID
        {
          headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Twitter API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Twitter API error response:', errorText);
        throw new Error(`Twitter API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Twitter API response data:', JSON.stringify(data, null, 2));
      
      const trends = data[0]?.trends || [];

      if (trends.length === 0) {
        console.log('No trends found in Twitter API response, using fallback data');
        return this.getFallbackTwitterData();
      }

      return trends.map((trend: any) => ({
        tag: trend.name.replace('#', ''),
        platform: 'twitter' as const,
        popularity: this.calculatePopularity(trend.tweet_volume),
        trending: true,
        usageCount: trend.tweet_volume || 0,
        timestamp: new Date(),
        source: 'api' as const
      }));
    } catch (error) {
      console.error('Error fetching Twitter trends:', error);
      return this.getFallbackTwitterData();
    }
  }

  // Fetch trending hashtags from Instagram (using scraping)
  async fetchInstagramTrending(): Promise<LiveHashtagData[]> {
    try {
      // Note: Instagram doesn't have a public API for trending hashtags
      // This would require web scraping or third-party services
      console.log('Instagram API not available, using fallback data');
      return this.getFallbackInstagramData();
    } catch (error) {
      console.error('Error fetching Instagram trends:', error);
      return this.getFallbackInstagramData();
    }
  }

  // Fetch trending hashtags from YouTube
  async fetchYouTubeTrending(): Promise<LiveHashtagData[]> {
    try {
      // Check if API key is available
      if (!process.env.YOUTUBE_API_KEY || process.env.YOUTUBE_API_KEY === 'your_youtube_api_key_here') {
        console.log('YouTube API key not configured, using fallback data');
        return this.getFallbackYouTubeData();
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&chart=mostPopular&regionCode=IN&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }

      const data = await response.json();
      const videos = data.items || [];

      // Extract hashtags from video titles and descriptions
      const hashtags: string[] = [];
      videos.forEach((video: any) => {
        const title = video.snippet.title;
        const description = video.snippet.description;
        const text = `${title} ${description}`;
        
        // Extract hashtags (simple regex)
        const matches = text.match(/#\w+/g);
        if (matches) {
          hashtags.push(...matches.map(tag => tag.replace('#', '')));
        }
      });

      // Count and rank hashtags
      const hashtagCounts = hashtags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return Object.entries(hashtagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 20)
        .map(([tag, count]) => ({
          tag,
          platform: 'youtube' as const,
          popularity: Math.min(100, count * 5),
          trending: true,
          usageCount: count,
          timestamp: new Date(),
          source: 'api' as const
        }));
    } catch (error) {
      console.error('Error fetching YouTube trends:', error);
      return this.getFallbackYouTubeData();
    }
  }

  // Fetch trending hashtags from Facebook
  async fetchFacebookTrending(): Promise<LiveHashtagData[]> {
    try {
      // Facebook Graph API doesn't provide trending hashtags directly
      // This would require third-party services or scraping
      console.log('Facebook API not available, using fallback data');
      return this.getFallbackFacebookData();
    } catch (error) {
      console.error('Error fetching Facebook trends:', error);
      return this.getFallbackFacebookData();
    }
  }

  // Get all trending hashtags with caching
  async getAllTrendingHashtags(platform?: string): Promise<LiveHashtagData[]> {
    const cacheKey = platform || 'all';
    const now = Date.now();
    const lastUpdateTime = this.lastUpdate.get(cacheKey) || 0;

    // Return cached data if still fresh
    if (now - lastUpdateTime < this.CACHE_DURATION && this.cache.has(cacheKey)) {
      console.log('Returning cached data for platform:', platform);
      return this.cache.get(cacheKey) || [];
    }

    let allTrends: LiveHashtagData[] = [];

    try {
      console.log('Fetching fresh data for platform:', platform);

      if (!platform || platform === 'twitter') {
        console.log('Fetching Twitter trends...');
        const twitterTrends = await this.fetchTwitterTrending();
        allTrends.push(...twitterTrends);
        console.log('Twitter trends fetched:', twitterTrends.length);
      }

      if (!platform || platform === 'instagram') {
        console.log('Fetching Instagram trends...');
        const instagramTrends = await this.fetchInstagramTrending();
        allTrends.push(...instagramTrends);
        console.log('Instagram trends fetched:', instagramTrends.length);
      }

      if (!platform || platform === 'youtube') {
        console.log('Fetching YouTube trends...');
        const youtubeTrends = await this.fetchYouTubeTrending();
        allTrends.push(...youtubeTrends);
        console.log('YouTube trends fetched:', youtubeTrends.length);
      }

      if (!platform || platform === 'facebook') {
        console.log('Fetching Facebook trends...');
        const facebookTrends = await this.fetchFacebookTrending();
        allTrends.push(...facebookTrends);
        console.log('Facebook trends fetched:', facebookTrends.length);
      }

      console.log('Total trends fetched:', allTrends.length);

      // Cache the results
      this.cache.set(cacheKey, allTrends);
      this.lastUpdate.set(cacheKey, now);

      // Update database with new trending data
      await this.updateDatabase(allTrends);

      return allTrends;
    } catch (error) {
      console.error('Error fetching trending hashtags:', error);
      // Return fallback data if API fails
      if (allTrends.length === 0) {
        console.log('No trends fetched, returning fallback data');
        return this.getFallbackDataForPlatform(platform);
      }
      return this.cache.get(cacheKey) || [];
    }
  }

  // Update database with live hashtag data
  private async updateDatabase(hashtags: LiveHashtagData[]): Promise<void> {
    try {
      await connectDB();

      for (const hashtagData of hashtags) {
        await Hashtag.findOneAndUpdate(
          { 
            tag: hashtagData.tag,
            platforms: hashtagData.platform
          },
          {
            $set: {
              popularity: hashtagData.popularity,
              trending: hashtagData.trending,
              usageCount: hashtagData.usageCount,
              updatedAt: new Date()
            }
          },
          { 
            upsert: true,
            new: true
          }
        );
      }

      console.log(`Updated ${hashtags.length} hashtags in database`);
    } catch (error) {
      console.error('Error updating database:', error);
    }
  }

  // Calculate popularity score based on usage count
  private calculatePopularity(usageCount: number): number {
    if (!usageCount) return 50;
    
    // Logarithmic scale to normalize popularity (0-100)
    const normalized = Math.log10(usageCount + 1) * 20;
    return Math.min(100, Math.max(0, normalized));
  }

  // Get hashtag suggestions based on content
  async getHashtagSuggestions(content: string, platform: string): Promise<string[]> {
    const trending = await this.getAllTrendingHashtags(platform);
    const contentLower = content.toLowerCase();
    
    // Filter hashtags that might be relevant to content
    const relevant = trending.filter(hashtag => {
      const tag = hashtag.tag.toLowerCase();
      return contentLower.includes(tag) || 
             tag.includes(contentLower.split(' ')[0]) ||
             hashtag.popularity > 80;
    });

    return relevant.slice(0, 10).map(h => h.tag);
  }

  // Fallback data methods for testing without API keys
  private getFallbackTwitterData(): LiveHashtagData[] {
    const fallbackHashtags = [
      'india', 'news', 'trending', 'viral', 'breaking', 'update', 'live',
      'cricket', 'ipl', 'bollywood', 'politics', 'business', 'technology',
      'startup', 'entrepreneur', 'marketing', 'socialmedia', 'digital',
      'innovation', 'ai', 'tech', 'fintech', 'edtech', 'healthtech'
    ];

    return fallbackHashtags.map(tag => ({
      tag,
      platform: 'twitter' as const,
      popularity: Math.floor(Math.random() * 40) + 60, // 60-100
      trending: true,
      usageCount: Math.floor(Math.random() * 50000) + 1000,
      timestamp: new Date(),
      source: 'fallback' as const
    }));
  }

  private getFallbackInstagramData(): LiveHashtagData[] {
    const fallbackHashtags = [
      'lifestyle', 'fashion', 'food', 'travel', 'fitness', 'beauty',
      'photography', 'art', 'music', 'nature', 'love', 'happy',
      'instagood', 'photooftheday', 'beautiful', 'cute', 'selfie',
      'summer', 'instadaily', 'friends', 'family', 'fun', 'style',
      'smile', 'foodie', 'delicious', 'recipe', 'cooking', 'restaurant'
    ];

    return fallbackHashtags.map(tag => ({
      tag,
      platform: 'instagram' as const,
      popularity: Math.floor(Math.random() * 40) + 60, // 60-100
      trending: true,
      usageCount: Math.floor(Math.random() * 100000) + 5000,
      timestamp: new Date(),
      source: 'fallback' as const
    }));
  }

  private getFallbackYouTubeData(): LiveHashtagData[] {
    const fallbackHashtags = [
      'youtube', 'video', 'vlog', 'tutorial', 'review', 'gaming',
      'music', 'entertainment', 'comedy', 'tech', 'education',
      'cooking', 'fitness', 'travel', 'lifestyle', 'beauty',
      'fashion', 'reaction', 'challenge', 'prank', 'funny',
      'trending', 'viral', 'new', 'latest', 'hot', 'popular'
    ];

    return fallbackHashtags.map(tag => ({
      tag,
      platform: 'youtube' as const,
      popularity: Math.floor(Math.random() * 40) + 60, // 60-100
      trending: true,
      usageCount: Math.floor(Math.random() * 20000) + 1000,
      timestamp: new Date(),
      source: 'fallback' as const
    }));
  }

  private getFallbackFacebookData(): LiveHashtagData[] {
    const fallbackHashtags = [
      'news', 'india', 'politics', 'sports', 'entertainment',
      'business', 'technology', 'health', 'education', 'lifestyle',
      'food', 'travel', 'fashion', 'beauty', 'fitness',
      'music', 'movies', 'books', 'gaming', 'art', 'culture',
      'community', 'friends', 'family', 'memories', 'life'
    ];

    return fallbackHashtags.map(tag => ({
      tag,
      platform: 'facebook' as const,
      popularity: Math.floor(Math.random() * 30) + 70, // 70-100
      trending: true,
      usageCount: Math.floor(Math.random() * 10000) + 500,
      timestamp: new Date(),
      source: 'fallback' as const
    }));
  }

  private getFallbackDataForPlatform(platform?: string): LiveHashtagData[] {
    switch (platform) {
      case 'twitter':
        return this.getFallbackTwitterData();
      case 'instagram':
        return this.getFallbackInstagramData();
      case 'youtube':
        return this.getFallbackYouTubeData();
      case 'facebook':
        return this.getFallbackFacebookData();
      default:
        return [
          ...this.getFallbackTwitterData(),
          ...this.getFallbackInstagramData(),
          ...this.getFallbackYouTubeData(),
          ...this.getFallbackFacebookData()
        ];
    }
  }
}
