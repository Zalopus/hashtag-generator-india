export interface User {
  _id: string;
  email: string;
  name: string;
  password?: string;
  preferences: {
    platforms: ('facebook' | 'instagram' | 'youtube' | 'twitter')[];
    categories: string[];
  };
  savedHashtags: SavedHashtagSet[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Hashtag {
  _id: string;
  tag: string;
  category: string;
  platforms: ('facebook' | 'instagram' | 'youtube' | 'twitter')[];
  popularity: number;
  trending: boolean;
  indianContext: boolean;
  language: 'en';
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SavedHashtagSet {
  _id: string;
  name: string;
  hashtags: string[];
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter';
  category: string;
  createdAt: Date;
}

export interface HashtagGenerationRequest {
  content: string;
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter';
  category: string;
  count?: number;
  includeTrending?: boolean;
  includeIndianContext?: boolean;
}

export interface HashtagGenerationResponse {
  hashtags: string[];
  trending: string[];
  indianContext: string[];
  totalCount: number;
  platform: string;
  category: string;
}

export interface Analytics {
  _id: string;
  userId?: string;
  action: 'generate' | 'save' | 'copy' | 'share';
  platform: string;
  category: string;
  hashtagCount: number;
  timestamp: Date;
}

export interface TrendingTopic {
  _id: string;
  topic: string;
  hashtags: string[];
  platform: string;
  popularity: number;
  indianContext: boolean;
  startDate: Date;
  endDate: Date;
}

export interface IndianFestival {
  _id: string;
  name: string;
  nameHindi: string;
  date: Date;
  hashtags: string[];
  description: string;
  descriptionHindi: string;
  active: boolean;
}
