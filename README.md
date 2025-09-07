# Hashtag Generator India 🇮🇳

A comprehensive hashtag generator specifically designed for Indian social media creators and businesses. Generate trending hashtags for Instagram, Facebook, and YouTube with Indian context awareness.

## Features

### 🎯 Platform-Specific Optimization
- **Instagram**: Up to 30 hashtags with optimal engagement strategies
- **Facebook**: Up to 10 hashtags for better reach
- **YouTube**: Up to 15 hashtags for video discoverability

### 🇮🇳 Indian Context Awareness
- Festival-based hashtags (Diwali, Holi, Dussehra, etc.)
- City-specific hashtags (Mumbai, Delhi, Bangalore, etc.)
- Cultural context (Bollywood, Cricket, Indian food)
- English language support

### 📊 Smart Analytics
- Trending hashtag detection
- Usage analytics and popularity tracking
- Category-based organization
- Real-time festival calendar

### 👤 User Management
- User authentication and profiles
- Save and organize hashtag sets
- Personal preferences and settings
- Usage history and analytics

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Express.js patterns
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom Indian-themed design

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account or local MongoDB instance
- Vercel account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hashtag-generator-india
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hashtag-generator?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-here
   ```

4. **Database Seeding**
   ```bash
   # Start the development server first
   npm run dev
   
   # In another terminal, seed the database
   curl -X POST http://localhost:3000/api/seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Hashtag Generation
- `POST /api/hashtags/generate` - Generate hashtags based on content
- `GET /api/hashtags/trending` - Get trending hashtags
- `POST /api/hashtags/save` - Save hashtag sets
- `GET /api/hashtags/save` - Get saved hashtag sets
- `DELETE /api/hashtags/save` - Delete saved hashtag sets

### Database Management
- `POST /api/seed` - Seed database with sample data (development only)

## Database Schema

### Users Collection
```typescript
{
  email: string;
  name: string;
  password: string; // hashed
  preferences: {
    platforms: string[];
    categories: string[];
    language: 'en' | 'hi';
  };
  savedHashtags: SavedHashtagSet[];
}
```

### Hashtags Collection
```typescript
{
  tag: string;
  category: string;
  platforms: string[];
  popularity: number;
  trending: boolean;
  indianContext: boolean;
  language: 'en' | 'hi';
  usageCount: number;
}
```

### Indian Festivals Collection
```typescript
{
  name: string;
  nameHindi: string;
  date: Date;
  hashtags: string[];
  description: string;
  descriptionHindi: string;
  active: boolean;
}
```

## Deployment

### Vercel Deployment

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables**
   In Vercel dashboard, add these environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas cluster
2. Create a database user
3. Whitelist your IP addresses
4. Get the connection string
5. Update `MONGODB_URI` in environment variables

## Usage Examples

### Generate Hashtags
```javascript
const response = await fetch('/api/hashtags/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    content: 'Delicious street food in Mumbai',
    platform: 'instagram',
    category: 'food',
    language: 'en',
    count: 20,
    includeTrending: true,
    includeIndianContext: true
  })
});

const data = await response.json();
console.log(data.hashtags); // Array of generated hashtags
```

### Save Hashtag Set
```javascript
const response = await fetch('/api/hashtags/save', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    name: 'Mumbai Food Hashtags',
    hashtags: ['mumbai', 'food', 'streetfood', 'delicious'],
    platform: 'instagram',
    category: 'food'
  })
});
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@hashtaggeneratorindia.com or join our Discord community.

## Roadmap

- [ ] AI-powered hashtag suggestions
- [ ] Hashtag performance analytics
- [ ] Social media scheduling integration
- [ ] Bulk hashtag management
- [ ] Hashtag trend predictions
- [ ] Multi-language support expansion
- [ ] Mobile app development

---

Made with ❤️ for Indian creators and businesses
