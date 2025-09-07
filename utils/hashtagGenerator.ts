import { HashtagGenerationRequest, HashtagGenerationResponse } from '@/types';

// Platform-specific hashtag strategies
export const PLATFORM_STRATEGIES = {
  instagram: {
    maxHashtags: 30,
    optimalRange: [20, 30],
    categories: {
      lifestyle: ['lifestyle', 'life', 'daily', 'motivation', 'inspiration', 'selfie', 'photography'],
      business: ['business', 'entrepreneur', 'startup', 'marketing', 'brand', 'success', 'growth'],
      food: ['food', 'foodie', 'delicious', 'recipe', 'cooking', 'restaurant', 'tasty'],
      travel: ['travel', 'wanderlust', 'adventure', 'explore', 'vacation', 'tourism', 'journey'],
      fashion: ['fashion', 'style', 'outfit', 'trendy', 'clothing', 'designer', 'beauty'],
      fitness: ['fitness', 'workout', 'gym', 'health', 'exercise', 'training', 'wellness']
    },
    trending: ['viral', 'trending', 'popular', 'fyp', 'explore', 'discover', 'new']
  },
  facebook: {
    maxHashtags: 10,
    optimalRange: [3, 8],
    categories: {
      lifestyle: ['lifestyle', 'life', 'family', 'friends', 'community'],
      business: ['business', 'entrepreneur', 'marketing', 'brand', 'networking'],
      food: ['food', 'recipe', 'cooking', 'restaurant', 'dining'],
      travel: ['travel', 'vacation', 'tourism', 'adventure', 'explore'],
      fashion: ['fashion', 'style', 'clothing', 'beauty', 'trends'],
      fitness: ['fitness', 'health', 'wellness', 'exercise', 'training']
    },
    trending: ['trending', 'popular', 'viral', 'news', 'update']
  },
  youtube: {
    maxHashtags: 15,
    optimalRange: [8, 15],
    categories: {
      lifestyle: ['lifestyle', 'vlog', 'daily', 'routine', 'life', 'personal'],
      business: ['business', 'entrepreneur', 'marketing', 'tutorial', 'education'],
      food: ['food', 'cooking', 'recipe', 'tutorial', 'review', 'taste'],
      travel: ['travel', 'vlog', 'adventure', 'tourism', 'explore', 'journey'],
      fashion: ['fashion', 'style', 'haul', 'review', 'beauty', 'makeup'],
      fitness: ['fitness', 'workout', 'tutorial', 'health', 'training', 'gym']
    },
    trending: ['trending', 'viral', 'popular', 'new', 'latest', 'hot']
  },
  twitter: {
    maxHashtags: 5,
    optimalRange: [2, 5],
    categories: {
      lifestyle: ['lifestyle', 'life', 'daily', 'thoughts', 'mood', 'personal'],
      business: ['business', 'entrepreneur', 'startup', 'marketing', 'brand', 'growth'],
      food: ['food', 'foodie', 'delicious', 'recipe', 'cooking', 'tasty'],
      travel: ['travel', 'wanderlust', 'adventure', 'explore', 'vacation', 'tourism'],
      fashion: ['fashion', 'style', 'outfit', 'beauty', 'trends', 'ootd'],
      fitness: ['fitness', 'workout', 'health', 'wellness', 'training', 'gym']
    },
    trending: ['trending', 'viral', 'breaking', 'news', 'update', 'hot']
  }
};

// Indian context keywords and hashtags
export const INDIAN_CONTEXT = {
  festivals: {
    diwali: ['diwali', 'festivaloflights', 'deepavali', 'indianfestival', 'celebration', 'lights', 'rangoli'],
    holi: ['holi', 'festivalofcolors', 'colorful', 'spring', 'celebration', 'fun', 'colors'],
    dussehra: ['dussehra', 'vijayadashami', 'victory', 'goodoverevil', 'celebration', 'indianfestival'],
    eid: ['eid', 'eidmubarak', 'ramadan', 'festival', 'celebration', 'muslimfestival'],
    christmas: ['christmas', 'xmas', 'festival', 'celebration', 'joy', 'peace'],
    republicday: ['republicday', 'india', 'patriotic', 'freedom', 'independence', 'proudindian'],
    independenceday: ['independenceday', 'india', 'patriotic', 'freedom', 'independence', 'proudindian']
  },
  cities: {
    mumbai: ['mumbai', 'bombay', 'cityofdreams', 'financialcapital', 'bollywood'],
    delhi: ['delhi', 'capital', 'newdelhi', 'history', 'culture', 'politics'],
    bangalore: ['bangalore', 'bengaluru', 'siliconvalley', 'tech', 'startup', 'it'],
    chennai: ['chennai', 'madras', 'tamilnadu', 'culture', 'tradition', 'south'],
    kolkata: ['kolkata', 'calcutta', 'bengal', 'culture', 'literature', 'art'],
    hyderabad: ['hyderabad', 'nawab', 'biryani', 'tech', 'culture', 'heritage'],
    pune: ['pune', 'punekar', 'education', 'culture', 'heritage', 'maharashtra']
  },
  culture: {
    bollywood: ['bollywood', 'hindi', 'movies', 'entertainment', 'cinema', 'actors'],
    cricket: ['cricket', 'ipl', 'bcci', 'sports', 'india', 'teamindia'],
    food: ['indianfood', 'spicy', 'curry', 'biryani', 'dal', 'roti', 'naan'],
    languages: ['hindi', 'tamil', 'telugu', 'bengali', 'marathi', 'gujarati', 'punjabi'],
    traditions: ['tradition', 'culture', 'heritage', 'indian', 'values', 'customs']
  },
  trending: {
    current: ['trending', 'viral', 'popular', 'hot', 'latest', 'new', 'fyp'],
    indian: ['indian', 'india', 'desi', 'bharat', 'hindustan', 'proudindian']
  }
};

// Generate platform-specific hashtags
export function generatePlatformHashtags(
  request: HashtagGenerationRequest,
  baseHashtags: string[],
  trendingHashtags: string[],
  indianContextHashtags: string[]
): string[] {
  const strategy = PLATFORM_STRATEGIES[request.platform];
  const maxHashtags = Math.min(request.count || 20, strategy.maxHashtags);
  
  let hashtags: string[] = [];
  
  // Add base hashtags (60% of total)
  const baseCount = Math.floor(maxHashtags * 0.6);
  hashtags.push(...baseHashtags.slice(0, baseCount));
  
  // Add trending hashtags (20% of total)
  const trendingCount = Math.floor(maxHashtags * 0.2);
  hashtags.push(...trendingHashtags.slice(0, trendingCount));
  
  // Add Indian context hashtags (20% of total)
  const indianCount = Math.floor(maxHashtags * 0.2);
  hashtags.push(...indianContextHashtags.slice(0, indianCount));
  
  // Remove duplicates and limit to max
  const uniqueHashtags = [...new Set(hashtags)];
  
  return uniqueHashtags.slice(0, maxHashtags);
}

// Analyze content for Indian context
export function analyzeIndianContext(content: string): {
  hasIndianContext: boolean;
  detectedKeywords: string[];
  suggestedHashtags: string[];
} {
  const contentLower = content.toLowerCase();
  const detectedKeywords: string[] = [];
  const suggestedHashtags: string[] = [];
  
  // Check for festival keywords
  Object.entries(INDIAN_CONTEXT.festivals).forEach(([festival, hashtags]) => {
    if (contentLower.includes(festival)) {
      detectedKeywords.push(festival);
      suggestedHashtags.push(...hashtags);
    }
  });
  
  // Check for city keywords
  Object.entries(INDIAN_CONTEXT.cities).forEach(([city, hashtags]) => {
    if (contentLower.includes(city)) {
      detectedKeywords.push(city);
      suggestedHashtags.push(...hashtags);
    }
  });
  
  // Check for cultural keywords
  Object.entries(INDIAN_CONTEXT.culture).forEach(([category, hashtags]) => {
    if (contentLower.includes(category)) {
      detectedKeywords.push(category);
      suggestedHashtags.push(...hashtags);
    }
  });
  
  // Check for general Indian keywords
  const generalIndianKeywords = ['india', 'indian', 'desi', 'bharat', 'hindustan'];
  generalIndianKeywords.forEach(keyword => {
    if (contentLower.includes(keyword)) {
      detectedKeywords.push(keyword);
      suggestedHashtags.push(...INDIAN_CONTEXT.trending.indian);
    }
  });
  
  return {
    hasIndianContext: detectedKeywords.length > 0,
    detectedKeywords,
    suggestedHashtags: [...new Set(suggestedHashtags)]
  };
}

// Get current Indian festivals
export function getCurrentIndianFestivals(): string[] {
  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1-12
  const currentDay = now.getDate();
  
  const festivals: { [key: string]: string[] } = {
    '1': ['newyear', 'republicday'], // January
    '2': ['valentinesday'], // February
    '3': ['holi', 'holy'], // March
    '4': ['easter', 'ramnavami'], // April
    '5': ['labourday'], // May
    '6': ['eid'], // June
    '7': ['independenceday'], // July
    '8': ['rakhi', 'raksha'], // August
    '9': ['ganesh', 'ganpati'], // September
    '10': ['dussehra', 'navratri'], // October
    '11': ['diwali', 'deepavali'], // November
    '12': ['christmas', 'xmas'] // December
  };
  
  const currentFestivals = festivals[currentMonth.toString()] || [];
  return currentFestivals;
}

// Optimize hashtags for platform
export function optimizeHashtagsForPlatform(
  hashtags: string[],
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter'
): string[] {
  const strategy = PLATFORM_STRATEGIES[platform];
  
  // Sort by relevance and popularity
  const optimized = hashtags
    .filter(hashtag => hashtag.length <= 30) // Remove very long hashtags
    .slice(0, strategy.maxHashtags);
  
  return optimized;
}

// Generate hashtag suggestions based on content analysis
export function generateContentBasedHashtags(
  content: string,
  category: string,
  platform: 'facebook' | 'instagram' | 'youtube' | 'twitter'
): string[] {
  const contentLower = content.toLowerCase();
  const suggestions: string[] = [];
  
  // Get category-specific hashtags
  const categoryHashtags = PLATFORM_STRATEGIES[platform].categories[category as keyof typeof PLATFORM_STRATEGIES[typeof platform]['categories']] || [];
  suggestions.push(...categoryHashtags);
  
  // Analyze for Indian context
  const indianAnalysis = analyzeIndianContext(content);
  if (indianAnalysis.hasIndianContext) {
    suggestions.push(...indianAnalysis.suggestedHashtags);
  }
  
  // Add current festival hashtags
  const currentFestivals = getCurrentIndianFestivals();
  currentFestivals.forEach(festival => {
    if (contentLower.includes(festival)) {
      suggestions.push(...INDIAN_CONTEXT.festivals[festival as keyof typeof INDIAN_CONTEXT.festivals] || []);
    }
  });
  
  // Add trending hashtags
  suggestions.push(...PLATFORM_STRATEGIES[platform].trending);
  
  return [...new Set(suggestions)];
}
