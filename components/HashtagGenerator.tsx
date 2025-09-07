'use client';

import { useState } from 'react';
import { Copy, Save, RefreshCw, Instagram, Facebook, Youtube, Twitter, TrendingUp, Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface HashtagGeneratorProps {
  className?: string;
}

export default function HashtagGenerator({ className = '' }: HashtagGeneratorProps) {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<'facebook' | 'instagram' | 'youtube' | 'twitter'>('instagram');
  const [category, setCategory] = useState('lifestyle');
  const [count, setCount] = useState(20);
  const [includeTrending, setIncludeTrending] = useState(true);
  const [includeIndianContext, setIncludeIndianContext] = useState(true);
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [trendingHashtags, setTrendingHashtags] = useState<string[]>([]);
  const [indianContextHashtags, setIndianContextHashtags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const categories = [
    'lifestyle', 'business', 'food', 'travel', 'fashion', 'beauty',
    'fitness', 'technology', 'education', 'entertainment', 'news',
    'sports', 'health', 'finance', 'real-estate', 'automotive',
    'photography', 'art', 'music', 'books', 'gaming', 'parenting',
    'wedding', 'festival', 'culture', 'politics', 'environment'
  ];

  const platformLimits = {
    instagram: 30,
    facebook: 10,
    youtube: 15,
    twitter: 5
  };

  const handleGenerate = async () => {
    if (!content.trim()) {
      toast.error('Please enter some content to generate hashtags');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/hashtags/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(user && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
        },
        body: JSON.stringify({
          content,
          platform,
          category,
          count: Math.min(count, platformLimits[platform]),
          includeTrending,
          includeIndianContext,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedHashtags(data.hashtags);
        setTrendingHashtags(data.trending);
        setIndianContextHashtags(data.indianContext);
        toast.success(`Generated ${data.hashtags.length} hashtags!`);
      } else {
        toast.error(data.error || 'Failed to generate hashtags');
      }
    } catch (error) {
      console.error('Error generating hashtags:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (generatedHashtags.length === 0) {
      toast.error('No hashtags to copy');
      return;
    }

    const hashtagText = generatedHashtags.map(tag => `#${tag}`).join(' ');
    try {
      await navigator.clipboard.writeText(hashtagText);
      toast.success('Hashtags copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy hashtags');
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast.error('Please login to save hashtags');
      return;
    }

    if (!saveName.trim()) {
      toast.error('Please enter a name for your hashtag set');
      return;
    }

    if (generatedHashtags.length === 0) {
      toast.error('No hashtags to save');
      return;
    }

    try {
      const response = await fetch('/api/hashtags/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: saveName,
          hashtags: generatedHashtags,
          platform,
          category,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Hashtags saved successfully!');
        setShowSaveForm(false);
        setSaveName('');
      } else {
        toast.error(data.error || 'Failed to save hashtags');
      }
    } catch (error) {
      console.error('Error saving hashtags:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Generate Hashtags
        </h2>
        <p className="text-gray-600">
          Create trending hashtags for your social media content with Indian context awareness
        </p>
      </div>

      {/* Content Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Content Description *
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe your content (e.g., 'Delicious street food in Mumbai', 'New fashion trends for Diwali')"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      {/* Platform Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Social Media Platform
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['instagram', 'facebook', 'youtube', 'twitter'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`flex items-center justify-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                platform === p
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }`}
            >
              {getPlatformIcon(p)}
              <span className="font-medium capitalize">{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Category and Settings */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Count and Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Hashtags (Max: {platformLimits[platform]})
          </label>
          <input
            type="number"
            min="1"
            max={platformLimits[platform]}
            value={count}
            onChange={(e) => setCount(Math.min(parseInt(e.target.value) || 1, platformLimits[platform]))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeTrending}
              onChange={(e) => setIncludeTrending(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Include Trending</span>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={includeIndianContext}
              onChange={(e) => setIncludeIndianContext(e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Indian Context</span>
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading || !content.trim()}
        className="w-full btn-primary flex items-center justify-center space-x-2 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <RefreshCw className="w-5 h-5 animate-spin" />
        ) : (
          <TrendingUp className="w-5 h-5" />
        )}
        <span>{loading ? 'Generating...' : 'Generate Hashtags'}</span>
      </button>

      {/* Generated Hashtags */}
      {generatedHashtags.length > 0 && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Hashtags ({generatedHashtags.length})
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={handleCopy}
                className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span className="text-sm">Copy</span>
              </button>
              {/* Temporarily hidden - will be enabled in future for revenue generation */}
              {false && user && (
                <button
                  onClick={() => setShowSaveForm(true)}
                  className="flex items-center space-x-1 px-3 py-1 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span className="text-sm">Save</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {generatedHashtags.map((hashtag, index) => (
              <span
                key={index}
                className="hashtag"
                onClick={() => {
                  navigator.clipboard.writeText(`#${hashtag}`);
                  toast.success(`#${hashtag} copied!`);
                }}
              >
                #{hashtag}
              </span>
            ))}
          </div>

          {/* Trending and Indian Context Sections */}
          {(trendingHashtags.length > 0 || indianContextHashtags.length > 0) && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingHashtags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Trending Hashtags</h4>
                  <div className="flex flex-wrap gap-1">
                    {trendingHashtags.slice(0, 5).map((hashtag, index) => (
                      <span key={index} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {indianContextHashtags.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Indian Context</h4>
                  <div className="flex flex-wrap gap-1">
                    {indianContextHashtags.slice(0, 5).map((hashtag, index) => (
                      <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Save Form Modal */}
      {showSaveForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Save Hashtag Set</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Enter a name for this hashtag set"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mb-4"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleSave}
                className="flex-1 btn-primary"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setShowSaveForm(false);
                  setSaveName('');
                }}
                className="flex-1 btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
