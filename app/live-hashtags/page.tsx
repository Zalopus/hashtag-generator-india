'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import LiveHashtagDashboard from '@/components/LiveHashtagDashboard';

export default function LiveHashtagsPage() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Live Trending Hashtags
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover real-time trending hashtags from Twitter, Instagram, YouTube, and Facebook. 
                Stay ahead of the trends and boost your social media reach.
              </p>
            </div>

            {/* Live Hashtag Dashboard */}
            <LiveHashtagDashboard />

            {/* Features Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
                <p className="text-gray-600">
                  Get live trending hashtags updated every 5 minutes from all major social media platforms.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Popularity Analytics</h3>
                <p className="text-gray-600">
                  See popularity scores, usage counts, and trending status for each hashtag.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Multi-Platform</h3>
                <p className="text-gray-600">
                  Access trending hashtags from Twitter, Instagram, YouTube, and Facebook in one place.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                How Live Hashtags Work
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">1</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Data Collection</h3>
                  <p className="text-sm text-gray-600">
                    We collect trending hashtags from official APIs and social media platforms.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">2</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analysis</h3>
                  <p className="text-sm text-gray-600">
                    Each hashtag is analyzed for popularity, usage count, and trending status.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">3</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Caching</h3>
                  <p className="text-sm text-gray-600">
                    Data is cached for 5 minutes to ensure fast loading and reduce API calls.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary-600">4</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Display</h3>
                  <p className="text-sm text-gray-600">
                    Live hashtags are displayed with real-time updates and popularity metrics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthProvider>
  );
}
