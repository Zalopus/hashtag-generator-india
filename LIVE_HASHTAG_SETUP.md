# Live Hashtag Integration Setup Guide

## 🔥 **How to Connect Live Hashtag Data**

### **Step 1: Choose Your Data Source**

#### **Option A: Official APIs (Recommended)**
- **Twitter API v2**: Best for real-time trending hashtags
- **YouTube Data API v3**: Good for video-related hashtags
- **Instagram Basic Display API**: Limited but official
- **Facebook Graph API**: Limited hashtag access

#### **Option B: Third-party APIs**
- **RapidAPI**: Multiple social media APIs
- **Hashtagify**: Specialized hashtag analytics
- **Brand24**: Social media monitoring

#### **Option C: Web Scraping (Use Responsibly)**
- **Instagram Scraping**: Extract trending hashtags
- **Twitter Scraping**: Get trending topics
- **YouTube Scraping**: Monitor popular videos

---

## 🚀 **Quick Setup Instructions**

### **Step 1: Get API Keys**

#### **Twitter API v2 (Most Important)**
1. Go to [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new app
3. Get your Bearer Token
4. Add to `.env.local`:
   ```
   TWITTER_BEARER_TOKEN=your_bearer_token_here
   ```

#### **YouTube Data API v3**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Enable YouTube Data API v3
3. Create API key
4. Add to `.env.local`:
   ```
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

#### **Instagram Basic Display API**
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create Instagram Basic Display app
3. Get access token
4. Add to `.env.local`:
   ```
   INSTAGRAM_ACCESS_TOKEN=your_instagram_token_here
   ```

### **Step 2: Update Your Environment**

Add these to your `.env.local` file:

```bash
# Live Hashtag API Keys
TWITTER_BEARER_TOKEN=your_twitter_bearer_token_here
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
YOUTUBE_API_KEY=your_youtube_api_key_here
FACEBOOK_ACCESS_TOKEN=your_facebook_access_token_here

# Third-party API Keys (Optional)
RAPIDAPI_KEY=your_rapidapi_key_here
HASHTAGIFY_API_KEY=your_hashtagify_api_key_here
BRAND24_API_KEY=your_brand24_api_key_here
```

### **Step 3: Test Live Hashtags**

#### **API Endpoints Available:**
- `GET /api/hashtags/live` - Get all live trending hashtags
- `GET /api/hashtags/live?platform=twitter` - Get Twitter trends
- `GET /api/hashtags/live?platform=instagram` - Get Instagram trends
- `GET /api/hashtags/live?platform=youtube` - Get YouTube trends
- `GET /api/hashtags/live?platform=facebook` - Get Facebook trends
- `GET /api/hashtags/live?refresh=true` - Force refresh cache

#### **Test Commands:**
```bash
# Test live hashtags
curl "http://localhost:3000/api/hashtags/live"

# Test Twitter trends
curl "http://localhost:3000/api/hashtags/live?platform=twitter"

# Force refresh
curl "http://localhost:3000/api/hashtags/live?refresh=true"
```

---

## 📊 **Live Hashtag Features**

### **What You Get:**
- ✅ **Real-time Trending**: Live hashtags from all platforms
- ✅ **Popularity Scores**: Dynamic popularity calculation
- ✅ **Usage Counts**: Actual usage statistics
- ✅ **Caching**: 5-minute cache for performance
- ✅ **Rate Limiting**: Respects API limits
- ✅ **Auto-Update**: Database updates automatically

### **Data Sources:**
- **Twitter**: Official trending topics API
- **Instagram**: Scraped trending hashtags
- **YouTube**: Video title/description analysis
- **Facebook**: Scraped trending topics

---

## 🔧 **Advanced Configuration**

### **Rate Limiting:**
```typescript
// In lib/liveHashtagAPIs.ts
export const RATE_LIMITS = {
  twitter: {
    requests: 300,
    window: 900, // 15 minutes
    hashtagRequests: 75
  },
  // ... other platforms
};
```

### **Caching:**
```typescript
// Cache duration: 5 minutes
private readonly CACHE_DURATION = 5 * 60 * 1000;
```

### **Popularity Calculation:**
```typescript
// Logarithmic scale (0-100)
private calculatePopularity(usageCount: number): number {
  const normalized = Math.log10(usageCount + 1) * 20;
  return Math.min(100, Math.max(0, normalized));
}
```

---

## 🎯 **Implementation Status**

### **✅ Completed:**
- Live hashtag service architecture
- Twitter API integration
- YouTube API integration
- Instagram scraping fallback
- Facebook scraping fallback
- Caching system
- Rate limiting
- Database updates

### **🔄 Next Steps:**
1. **Get API Keys**: Set up Twitter and YouTube APIs
2. **Test Integration**: Use the test endpoints
3. **Monitor Performance**: Check rate limits
4. **Optimize Caching**: Adjust cache duration
5. **Add More Sources**: Integrate additional APIs

---

## 💡 **Pro Tips**

### **For Best Results:**
1. **Start with Twitter**: Most reliable for trending data
2. **Use YouTube API**: Great for video content hashtags
3. **Monitor Rate Limits**: Don't exceed API quotas
4. **Cache Aggressively**: Reduce API calls
5. **Fallback to Scraping**: When APIs are limited

### **Cost Considerations:**
- **Twitter API**: Free tier available
- **YouTube API**: 10,000 requests/day free
- **Instagram API**: Limited free access
- **Third-party APIs**: Usually paid services

---

## 🚨 **Important Notes**

### **API Limitations:**
- **Instagram**: No public trending hashtag API
- **Facebook**: Limited hashtag access
- **Rate Limits**: All APIs have usage limits
- **Terms of Service**: Follow platform guidelines

### **Legal Considerations:**
- **Respect Rate Limits**: Don't abuse APIs
- **Follow ToS**: Adhere to platform terms
- **Data Usage**: Use data responsibly
- **Attribution**: Credit data sources when required

---

## 🎉 **Ready to Go Live!**

Your Hashtag Generator India now supports:
- ✅ **Live Twitter Trends**: Real-time trending hashtags
- ✅ **YouTube Analytics**: Video-related hashtags
- ✅ **Instagram Insights**: Popular hashtag data
- ✅ **Facebook Trends**: Social media trends
- ✅ **Smart Caching**: Optimized performance
- ✅ **Auto-Updates**: Database synchronization

**Get your API keys and start fetching live hashtags!** 🚀
