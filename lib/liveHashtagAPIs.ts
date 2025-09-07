// Live Hashtag API Integration
// This file contains configurations for various social media APIs

export interface LiveHashtagData {
  tag: string;
  platform: 'instagram' | 'facebook' | 'youtube' | 'twitter';
  popularity: number;
  trending: boolean;
  usageCount: number;
  timestamp: Date;
  source: 'api' | 'scraper' | 'manual';
}

// Twitter API v2 Configuration
export const TWITTER_API_CONFIG = {
  bearerToken: process.env.TWITTER_BEARER_TOKEN,
  baseURL: 'https://api.twitter.com/2',
  endpoints: {
    trending: '/trends/by/woeid/23424848', // India WOEID
    hashtags: '/tweets/search/recent'
  }
};

// Instagram Basic Display API (Limited)
export const INSTAGRAM_API_CONFIG = {
  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  baseURL: 'https://graph.instagram.com',
  endpoints: {
    hashtag: '/{hashtag-id}',
    media: '/{hashtag-id}/recent_media'
  }
};

// YouTube Data API v3
export const YOUTUBE_API_CONFIG = {
  apiKey: process.env.YOUTUBE_API_KEY,
  baseURL: 'https://www.googleapis.com/youtube/v3',
  endpoints: {
    search: '/search',
    videos: '/videos'
  }
};

// Facebook Graph API
export const FACEBOOK_API_CONFIG = {
  accessToken: process.env.FACEBOOK_ACCESS_TOKEN,
  baseURL: 'https://graph.facebook.com/v18.0',
  endpoints: {
    hashtag: '/{hashtag-id}',
    posts: '/{hashtag-id}/posts'
  }
};

// Alternative: Third-party APIs
export const THIRD_PARTY_APIS = {
  // RapidAPI Hashtag APIs
  rapidapi: {
    key: process.env.RAPIDAPI_KEY,
    endpoints: {
      instagram: 'https://instagram-scraper-api2.p.rapidapi.com/v1/hashtag',
      twitter: 'https://twitter-api45.p.rapidapi.com/hashtag.php',
      youtube: 'https://youtube-v31.p.rapidapi.com/search'
    }
  },
  
  // Hashtagify API
  hashtagify: {
    key: process.env.HASHTAGIFY_API_KEY,
    baseURL: 'https://api.hashtagify.me'
  },
  
  // Brand24 API
  brand24: {
    key: process.env.BRAND24_API_KEY,
    baseURL: 'https://api.brand24.com'
  }
};

// Web scraping configurations
export const SCRAPING_CONFIG = {
  // Instagram scraping (use responsibly)
  instagram: {
    baseURL: 'https://www.instagram.com',
    endpoints: {
      hashtag: '/explore/tags/{hashtag}/',
      trending: '/explore/tags/'
    },
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  },
  
  // Twitter scraping (use responsibly)
  twitter: {
    baseURL: 'https://twitter.com',
    endpoints: {
      trending: '/i/trends',
      hashtag: '/hashtag/{hashtag}'
    }
  }
};

// Rate limiting configuration
export const RATE_LIMITS = {
  twitter: {
    requests: 300,
    window: 900, // 15 minutes
    hashtagRequests: 75
  },
  instagram: {
    requests: 200,
    window: 3600, // 1 hour
    hashtagRequests: 50
  },
  youtube: {
    requests: 10000,
    window: 86400, // 24 hours
    hashtagRequests: 1000
  },
  facebook: {
    requests: 200,
    window: 3600, // 1 hour
    hashtagRequests: 50
  }
};
