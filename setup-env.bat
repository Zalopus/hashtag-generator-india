@echo off
echo Creating .env.local file...
echo # Database > .env.local
echo MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hashtag-generator?retryWrites=true^&w=majority >> .env.local
echo. >> .env.local
echo # JWT Secret >> .env.local
echo JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random >> .env.local
echo. >> .env.local
echo # NextAuth >> .env.local
echo NEXTAUTH_URL=http://localhost:3000 >> .env.local
echo NEXTAUTH_SECRET=your-nextauth-secret-here >> .env.local
echo. >> .env.local
echo # API Keys (Optional) >> .env.local
echo OPENAI_API_KEY=your-openai-api-key >> .env.local
echo TWITTER_API_KEY=your-twitter-api-key >> .env.local
echo INSTAGRAM_API_KEY=your-instagram-api-key >> .env.local
echo.
echo .env.local file created successfully!
echo Please update the MongoDB URI with your actual database connection string.
echo.
pause
