#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Hashtag Generator India...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  const envExample = fs.readFileSync(path.join(process.cwd(), 'env.example'), 'utf8');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env.local created! Please update it with your MongoDB URI and JWT secret.\n');
} else {
  console.log('✅ .env.local already exists.\n');
}

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  console.log('📁 Creating public directory...');
  fs.mkdirSync(publicDir);
  console.log('✅ Public directory created.\n');
}

// Create favicon placeholder
const faviconPath = path.join(publicDir, 'favicon.ico');
if (!fs.existsSync(faviconPath)) {
  console.log('🎨 Creating favicon placeholder...');
  // Create a simple favicon placeholder (this would normally be a binary file)
  fs.writeFileSync(faviconPath, '');
  console.log('✅ Favicon placeholder created.\n');
}

console.log('🎉 Setup completed successfully!\n');
console.log('📋 Next steps:');
console.log('1. Update .env.local with your MongoDB URI and JWT secret');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');
console.log('5. Seed the database: curl -X POST http://localhost:3000/api/seed\n');
console.log('🌟 Your Hashtag Generator India is ready to boost social media reach!');
