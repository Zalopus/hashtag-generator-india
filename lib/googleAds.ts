// Google Ads configuration
export const GOOGLE_ADS_CONFIG = {
  // Replace with your actual Google AdSense Publisher ID
  publisherId: 'ca-pub-XXXXXXXXXXXXXXXX', // You'll get this from Google AdSense
  
  // Ad unit configurations
  adUnits: {
    // Homepage banner ad
    homepageBanner: {
      slot: '1234567890', // Replace with your actual ad slot ID
      format: 'auto',
      responsive: true,
      style: { display: 'block' }
    },
    
    // Sidebar rectangle ad
    sidebarRectangle: {
      slot: '1234567891', // Replace with your actual ad slot ID
      format: 'rectangle',
      responsive: true,
      style: { display: 'block' }
    },
    
    // In-content square ad
    inContentSquare: {
      slot: '1234567892', // Replace with your actual ad slot ID
      format: 'square',
      responsive: true,
      style: { display: 'block' }
    },
    
    // Footer banner ad
    footerBanner: {
      slot: '1234567893', // Replace with your actual ad slot ID
      format: 'auto',
      responsive: true,
      style: { display: 'block' }
    }
  }
};

// Google AdSense script URL
export const ADSENSE_SCRIPT_URL = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';

// Initialize Google AdSense
export const initializeGoogleAds = () => {
  if (typeof window !== 'undefined' && !window.adsbygoogle) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `${ADSENSE_SCRIPT_URL}?client=${GOOGLE_ADS_CONFIG.publisherId}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }
};

// Declare global adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}
