'use client';

import { useState, useEffect } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import HashtagGenerator from '@/components/HashtagGenerator';
import GoogleAd from '@/components/GoogleAd';
import { GOOGLE_ADS_CONFIG } from '@/lib/googleAds';
import { TrendingUp, Users, Globe, Zap } from 'lucide-react';

export default function Home() {
  const [liveUsers, setLiveUsers] = useState(1247);

  useEffect(() => {
    // Simulate live user count changes
    const interval = setInterval(() => {
      setLiveUsers(prev => {
        const change = Math.floor(Math.random() * 20) - 10; // -10 to +10
        return Math.max(1000, prev + change);
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Generate Trending
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">
                {' '}Hashtags{' '}
              </span>
              for India
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Boost your social media reach with AI-powered hashtag generation for Instagram, 
              Facebook, and YouTube. Perfect for Indian creators and businesses.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Hashtags Generated</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900" id="live-users">
                  {liveUsers.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Live Users Now</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Platforms</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">99%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Ad */}
        <section className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <GoogleAd 
              adSlot={GOOGLE_ADS_CONFIG.adUnits.homepageBanner.slot}
              adFormat="banner"
              className="mb-4"
            />
          </div>
        </section>

        {/* Main Generator */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <HashtagGenerator />
          </div>
        </section>

        {/* In-Content Ad */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto flex justify-center">
            <GoogleAd 
              adSlot={GOOGLE_ADS_CONFIG.adUnits.inContentSquare.slot}
              adFormat="square"
              className="mb-4"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Hashtag Generator?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is specifically designed for the Indian market with advanced features 
                to maximize your social media reach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trending Analysis</h3>
                <p className="text-gray-600">
                  Get real-time trending hashtags based on current social media activity in India.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Indian Context</h3>
                <p className="text-gray-600">
                  Understand Indian festivals, culture, and local trends for better engagement.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Platform Optimized</h3>
                <p className="text-gray-600">
                  Optimized hashtag limits and strategies for Instagram, Facebook, and YouTube.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Live Analytics</h3>
                <p className="text-gray-600">
                  Real-time user activity and trending hashtag performance tracking.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Category Based</h3>
                <p className="text-gray-600">
                  Choose from 25+ categories including lifestyle, business, food, and more.
                </p>
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100">
                <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Save & Organize</h3>
                <p className="text-gray-600">
                  Save your favorite hashtag sets and organize them for future use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500 to-purple-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Boost Your Social Media Reach?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of Indian creators and businesses who trust our hashtag generator.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#generator"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Generating Now
              </a>
              <a
                href="/trending"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
              >
                View Trending Hashtags
              </a>
            </div>
          </div>
        </section>

        {/* Footer Banner Ad */}
        <section className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <GoogleAd 
              adSlot={GOOGLE_ADS_CONFIG.adUnits.footerBanner.slot}
              adFormat="banner"
              className="mb-4"
            />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">#</span>
                  </div>
                  <span className="text-xl font-bold">Hashtag Generator</span>
                </div>
                <p className="text-gray-400">
                  The best hashtag generator for Indian social media creators and businesses.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Platforms</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/trending" className="hover:text-white transition-colors">Trending</a></li>
                  <li><a href="/festivals" className="hover:text-white transition-colors">Festivals</a></li>
                  <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Support</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Hashtag Generator India. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}
