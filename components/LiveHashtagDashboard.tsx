'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, Twitter, Instagram, Youtube, Facebook, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

interface LiveHashtagData {
  tag: string;
  platform: 'instagram' | 'facebook' | 'youtube' | 'twitter';
  popularity: number;
  trending: boolean;
  usageCount: number;
  timestamp: string;
  source: 'api' | 'fallback';
}

interface LiveHashtagResponse {
  hashtags: LiveHashtagData[];
  platform: string;
  lastUpdated: string;
  source: string;
  count: number;
}

export default function LiveHashtagDashboard() {
  const [liveHashtags, setLiveHashtags] = useState<LiveHashtagData[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const platforms = [
    { id: 'all', name: 'All Platforms', icon: TrendingUp },
    { id: 'twitter', name: 'Twitter', icon: Twitter },
    { id: 'instagram', name: 'Instagram', icon: Instagram },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'facebook', name: 'Facebook', icon: Facebook }
  ];

  const fetchLiveHashtags = async (platform: string = 'all', forceRefresh: boolean = false) => {
    setLoading(true);
    try {
      const url = `/api/hashtags/live?platform=${platform}${forceRefresh ? '&refresh=true' : ''}`;
      console.log('Fetching from URL:', url); // Debug log
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch live hashtags`);
      }

      const data: LiveHashtagResponse = await response.json();
      console.log('Received data:', data); // Debug log
      console.log('Hashtags count:', data.hashtags?.length || 0); // Debug log
      
      setLiveHashtags(data.hashtags || []);
      setLastUpdated(new Date(data.lastUpdated));
      
      if (forceRefresh) {
        toast.success(`Refreshed ${data.count} live hashtags`);
      }
    } catch (error) {
      console.error('Error fetching live hashtags:', error);
      toast.error('Failed to fetch live hashtags');
      setLiveHashtags([]); // Clear hashtags on error
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
    fetchLiveHashtags(platform);
  };

  const handleRefresh = () => {
    fetchLiveHashtags(selectedPlatform, true);
  };

  const copyHashtag = (tag: string) => {
    navigator.clipboard.writeText(`#${tag}`);
    toast.success(`Copied #${tag}`);
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = platforms.find(p => p.id === platform);
    return platformData ? <platformData.icon className="w-4 h-4" /> : null;
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'text-blue-500 bg-blue-50';
      case 'instagram': return 'text-pink-500 bg-pink-50';
      case 'youtube': return 'text-red-500 bg-red-50';
      case 'facebook': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 80) return 'text-green-600 bg-green-50';
    if (popularity >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  useEffect(() => {
    fetchLiveHashtags(selectedPlatform);
  }, []);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchLiveHashtags(selectedPlatform);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [selectedPlatform, autoRefresh]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Live Trending Hashtags
          </h2>
          <p className="text-gray-600">
            Real-time hashtag trends from social media platforms
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <button
                key={platform.id}
                onClick={() => handlePlatformChange(platform.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedPlatform === platform.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{platform.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto-refresh Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoRefresh"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
          />
          <label htmlFor="autoRefresh" className="text-sm text-gray-700">
            Auto-refresh every 5 minutes
          </label>
        </div>
        {lastUpdated && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        )}
      </div>

      {/* Live Hashtags Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {liveHashtags.map((hashtag, index) => (
          <div
            key={`${hashtag.tag}-${hashtag.platform}-${index}`}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlatformColor(hashtag.platform)}`}>
                  {getPlatformIcon(hashtag.platform)}
                  <span className="ml-1 capitalize">{hashtag.platform}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPopularityColor(hashtag.popularity)}`}>
                  {hashtag.popularity}% popular
                </span>
              </div>
              <button
                onClick={() => copyHashtag(hashtag.tag)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
            
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              #{hashtag.tag}
            </h3>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{hashtag.usageCount.toLocaleString()} uses</span>
              <span className="capitalize">{hashtag.source}</span>
            </div>
          </div>
        ))}
      </div>

      {liveHashtags.length === 0 && !loading && (
        <div className="text-center py-12">
          <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No live hashtags found</h3>
          <p className="text-gray-600">Try refreshing or check your API configuration</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 text-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading live hashtags...</p>
        </div>
      )}
    </div>
  );
}
