'use client';

import { useState, useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import GoogleAd from '@/components/GoogleAd';
import { GOOGLE_ADS_CONFIG } from '@/lib/googleAds';
import { TrendingUp, Calendar, MapPin, Star, Copy } from 'lucide-react';
import toast from 'react-hot-toast';

interface TrendingData {
  trending: Array<{
    tag: string;
    category: string;
    popularity: number;
    usageCount: number;
    indianContext: boolean;
  }>;
  festivals: Array<{
    name: string;
    hashtags: string[];
    date: string;
    description: string;
  }>;
  popularByCategory: Array<{
    category: string;
    hashtags: Array<{
      tag: string;
      popularity: number;
      usageCount: number;
    }>;
  }>;
  platform: string;
  lastUpdated: string;
}

export default function TrendingPage() {
  const [trendingData, setTrendingData] = useState<TrendingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('instagram');

  const fetchTrendingData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/hashtags/trending?platform=${selectedPlatform}`
      );
      const data = await response.json();
      setTrendingData(data);
    } catch (error) {
      console.error('Error fetching trending data:', error);
      toast.error('Failed to load trending data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingData();
  }, [selectedPlatform]);

  const handleCopyHashtag = async (hashtag: string) => {
    try {
      await navigator.clipboard.writeText(`#${hashtag}`);
      toast.success(`#${hashtag} copied!`);
    } catch (error) {
      toast.error('Failed to copy hashtag');
    }
  };

  const handleCopyAllFestivalHashtags = async (hashtags: string[]) => {
    const hashtagText = hashtags.map(tag => `#${tag}`).join(' ');
    try {
      await navigator.clipboard.writeText(hashtagText);
      toast.success('Festival hashtags copied!');
    } catch (error) {
      toast.error('Failed to copy hashtags');
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trending Hashtags
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                {' '}in India
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the most popular and trending hashtags across Indian social media platforms
            </p>
          </div>

          {/* Banner Ad */}
          <div className="mb-8">
            <GoogleAd 
              adSlot={GOOGLE_ADS_CONFIG.adUnits.homepageBanner.slot}
              adFormat="banner"
              className="mb-4"
            />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Platform:</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="youtube">YouTube</option>
                  <option value="twitter">X (Twitter)</option>
                </select>
              </div>
              
              
              <button
                onClick={fetchTrendingData}
                className="btn-primary text-sm"
              >
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading trending data...</p>
            </div>
          ) : trendingData ? (
            <div className="space-y-8">
              {/* Trending Hashtags */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <TrendingUp className="w-6 h-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date(trendingData.lastUpdated).toLocaleString()}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingData.trending.map((hashtag, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-orange-600">#{hashtag.tag}</span>
                          {hashtag.indianContext && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Indian
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 capitalize">{hashtag.category}</div>
                        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                          <span>🔥 {hashtag.popularity}%</span>
                          <span>📊 {hashtag.usageCount} uses</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopyHashtag(hashtag.tag)}
                        className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current Festivals */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Calendar className="w-6 h-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Current Festivals</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {trendingData.festivals.map((festival, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{festival.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{festival.description}</p>
                        </div>
                        <button
                          onClick={() => handleCopyAllFestivalHashtags(festival.hashtags)}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                        >
                          <Copy className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {festival.hashtags.slice(0, 6).map((hashtag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-200 transition-colors"
                            onClick={() => handleCopyHashtag(hashtag)}
                          >
                            #{hashtag}
                          </span>
                        ))}
                        {festival.hashtags.length > 6 && (
                          <span className="text-sm text-gray-500">
                            +{festival.hashtags.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In-Content Ad */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <div className="flex justify-center">
                  <GoogleAd 
                    adSlot={GOOGLE_ADS_CONFIG.adUnits.sidebarRectangle.slot}
                    adFormat="rectangle"
                    className="mb-4"
                  />
                </div>
              </div>

              {/* Popular by Category */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Star className="w-6 h-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Popular by Category</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingData.popularByCategory.map((category, index) => (
                    <div
                      key={index}
                      className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-4 capitalize">
                        {category.category.replace('-', ' ')}
                      </h3>
                      
                      <div className="space-y-2">
                        {category.hashtags.map((hashtag, tagIndex) => (
                          <div
                            key={tagIndex}
                            className="flex items-center justify-between p-2 bg-white rounded-lg"
                          >
                            <span className="text-sm font-medium text-gray-700">#{hashtag.tag}</span>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <span>🔥 {hashtag.popularity}%</span>
                              <span>📊 {hashtag.usageCount}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Failed to load trending data. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
}
