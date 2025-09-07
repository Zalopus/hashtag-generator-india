'use client';

import { useState, useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { Calendar, Copy, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface Festival {
  name: string;
  date: string;
  hashtags: string[];
  description: string;
}

export default function FestivalsPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading festival data
    const mockFestivals: Festival[] = [
      {
        name: 'Diwali',
        date: 'November 1, 2024',
        hashtags: ['diwali', 'festivaloflights', 'deepavali', 'indianfestival', 'celebration', 'lights', 'rangoli'],
        description: 'The festival of lights celebrated across India'
      },
      {
        name: 'Holi',
        date: 'March 25, 2024',
        hashtags: ['holi', 'festivalofcolors', 'colorful', 'spring', 'celebration', 'fun', 'colors'],
        description: 'The festival of colors marking the arrival of spring'
      },
      {
        name: 'Dussehra',
        date: 'October 12, 2024',
        hashtags: ['dussehra', 'vijayadashami', 'victory', 'goodoverevil', 'celebration', 'indianfestival'],
        description: 'Celebration of victory of good over evil'
      }
    ];
    
    setTimeout(() => {
      setFestivals(mockFestivals);
      setLoading(false);
    }, 1000);
  }, []);

  const handleCopyHashtags = async (hashtags: string[]) => {
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
              Indian Festivals
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                {' '}Hashtags
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover trending hashtags for Indian festivals and celebrations
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading festivals...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {festivals.map((festival, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{festival.name}</h3>
                        <p className="text-sm text-gray-600">{festival.date}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyHashtags(festival.hashtags)}
                      className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{festival.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {festival.hashtags.map((hashtag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-block bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium cursor-pointer hover:from-orange-200 hover:to-red-200 transition-colors"
                        onClick={() => {
                          navigator.clipboard.writeText(`#${hashtag}`);
                          toast.success(`#${hashtag} copied!`);
                        }}
                      >
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AuthProvider>
  );
}
