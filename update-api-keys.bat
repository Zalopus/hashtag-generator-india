@echo off
echo ========================================
echo   Hashtag Generator - API Keys Setup
echo ========================================
echo.

echo Current .env.local file:
type .env.local
echo.

echo ========================================
echo   API Keys Setup Instructions
echo ========================================
echo.
echo 1. META (Facebook & Instagram):
echo    - Go to: https://developers.facebook.com/
echo    - Create App → Get Access Tokens
echo    - Add to .env.local:
echo      FACEBOOK_ACCESS_TOKEN=your_facebook_token
echo      INSTAGRAM_ACCESS_TOKEN=your_instagram_token
echo.
echo 2. YOUTUBE:
echo    - Go to: https://console.cloud.google.com/
echo    - Enable YouTube Data API v3
echo    - Create API Key
echo    - Add to .env.local:
echo      YOUTUBE_API_KEY=your_youtube_key
echo.
echo 3. TWITTER (Already configured!):
echo    - Your Bearer Token is already set
echo.
echo ========================================
echo   After adding API keys, restart server:
echo   npm run dev
echo ========================================
echo.
pause
