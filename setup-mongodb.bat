@echo off
echo ========================================
echo    MongoDB Local Setup for Windows
echo ========================================
echo.

echo Option 1: MongoDB Atlas (Recommended - Free Cloud)
echo - Go to: https://www.mongodb.com/atlas
echo - Sign up for free account
echo - Create free cluster
echo - Get connection string
echo - Update .env.local with your connection string
echo.

echo Option 2: MongoDB Community Server (Local Installation)
echo - Download from: https://www.mongodb.com/try/download/community
echo - Install with "Install as Windows Service" checked
echo - Run as Administrator: net start MongoDB
echo.

echo Option 3: MongoDB Portable (No Installation)
echo - Download MongoDB Portable
echo - Extract to C:\mongodb
echo - Run: C:\mongodb\bin\mongod.exe --dbpath C:\mongodb\data
echo.

echo ========================================
echo    Quick Test Commands
echo ========================================
echo.
echo After setup, test with:
echo - mongod --version
echo - mongo --version
echo - net start MongoDB
echo.

echo ========================================
echo    Update .env.local
echo ========================================
echo.
echo For local MongoDB, use:
echo MONGODB_URI=mongodb://localhost:27017/hashtag-generator
echo.
echo For MongoDB Atlas, use your connection string from Atlas
echo.

pause
