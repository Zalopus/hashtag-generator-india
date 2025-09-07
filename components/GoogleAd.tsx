'use client';

import { useEffect, useRef } from 'react';
import { GOOGLE_ADS_CONFIG, initializeGoogleAds } from '@/lib/googleAds';

interface GoogleAdProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'square' | 'banner';
  className?: string;
  style?: React.CSSProperties;
}

export default function GoogleAd({ 
  adSlot, 
  adFormat = 'auto', 
  className = '', 
  style = {} 
}: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Google Ads
    initializeGoogleAds();

    // Load the ad
    const loadAd = () => {
      if (adRef.current && window.adsbygoogle) {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
          console.log('Ad loading error:', error);
        }
      }
    };

    // Small delay to ensure the ad container is rendered
    const timer = setTimeout(loadAd, 100);

    return () => clearTimeout(timer);
  }, []);

  const getAdStyle = () => {
    const baseStyle = {
      display: 'block',
      ...style
    };

    switch (adFormat) {
      case 'rectangle':
        return { ...baseStyle, width: '300px', height: '250px' };
      case 'square':
        return { ...baseStyle, width: '250px', height: '250px' };
      case 'banner':
        return { ...baseStyle, width: '100%', height: '90px' };
      default:
        return baseStyle;
    }
  };

  return (
    <div className={`google-ad-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={getAdStyle()}
        data-ad-client={GOOGLE_ADS_CONFIG.publisherId}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
