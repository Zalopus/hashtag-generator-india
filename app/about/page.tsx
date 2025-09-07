'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import { TrendingUp, Users, Globe, Zap, Heart, Target } from 'lucide-react';

export default function AboutPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                {' '}Hashtag Generator India
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering Indian creators and businesses with AI-powered hashtag generation
            </p>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 text-center max-w-4xl mx-auto">
              To democratize social media success for Indian creators and businesses by providing 
              intelligent, context-aware hashtag generation that understands Indian culture, 
              festivals, and trending topics.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">
                Advanced algorithms analyze trending patterns and generate optimal hashtags for maximum reach.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Indian Context</h3>
              <p className="text-gray-600">
                Deep understanding of Indian festivals, culture, and local trends for authentic engagement.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Optimized</h3>
              <p className="text-gray-600">
                Tailored strategies for Instagram, Facebook, and YouTube with platform-specific best practices.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl p-8 mb-12">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <div className="text-4xl font-bold mb-2">10K+</div>
                  <div className="text-primary-100">Hashtags Generated</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">5K+</div>
                  <div className="text-primary-100">Active Users</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">99%</div>
                  <div className="text-primary-100">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <div className="text-primary-100">Live Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Built with ❤️ for India</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-8">
              Our team of Indian developers and social media experts understands the unique challenges 
              and opportunities in the Indian social media landscape. We're committed to helping 
              Indian creators and businesses thrive in the digital space.
            </p>
            <div className="flex items-center justify-center space-x-2 text-primary-600">
              <Heart className="w-6 h-6" />
              <span className="text-lg font-medium">Made in India, for India</span>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
