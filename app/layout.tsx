import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { initializeGoogleAds } from '@/lib/googleAds';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hashtag Generator India - Boost Your Social Media Reach',
  description: 'Generate trending hashtags for Instagram, Facebook, and YouTube with Indian context awareness. Perfect for Indian creators and businesses.',
  keywords: 'hashtag generator, instagram hashtags, facebook hashtags, youtube hashtags, indian social media, trending hashtags',
  authors: [{ name: 'Hashtag Generator India' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Hashtag Generator India - Boost Your Social Media Reach',
    description: 'Generate trending hashtags for Instagram, Facebook, and YouTube with Indian context awareness.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Hashtag Generator India',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hashtag Generator India - Boost Your Social Media Reach',
    description: 'Generate trending hashtags for Instagram, Facebook, and YouTube with Indian context awareness.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ef4444" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
