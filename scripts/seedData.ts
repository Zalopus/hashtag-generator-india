import connectDB from '../lib/mongodb';
import Hashtag from '../models/Hashtag';
import IndianFestival from '../models/IndianFestival';

// Sample hashtags data
const sampleHashtags = [
  // Lifestyle
  { tag: 'lifestyle', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 95, trending: true, indianContext: false, language: 'en', usageCount: 1500 },
  { tag: 'life', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 90, trending: true, indianContext: false, language: 'en', usageCount: 1200 },
  { tag: 'daily', category: 'lifestyle', platforms: ['instagram', 'facebook', 'twitter'], popularity: 85, trending: false, indianContext: false, language: 'en', usageCount: 800 },
  { tag: 'motivation', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 88, trending: true, indianContext: false, language: 'en', usageCount: 1000 },
  { tag: 'inspiration', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 87, trending: false, indianContext: false, language: 'en', usageCount: 900 },
  { tag: 'selfie', category: 'lifestyle', platforms: ['instagram', 'facebook', 'twitter'], popularity: 92, trending: true, indianContext: false, language: 'en', usageCount: 1100 },
  { tag: 'photography', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 89, trending: false, indianContext: false, language: 'en', usageCount: 950 },

  // Business
  { tag: 'business', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 93, trending: true, indianContext: false, language: 'en', usageCount: 1300 },
  { tag: 'entrepreneur', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 91, trending: true, indianContext: false, language: 'en', usageCount: 1200 },
  { tag: 'startup', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 88, trending: false, indianContext: false, language: 'en', usageCount: 1000 },
  { tag: 'marketing', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 90, trending: true, indianContext: false, language: 'en', usageCount: 1100 },
  { tag: 'brand', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 87, trending: false, indianContext: false, language: 'en', usageCount: 900 },
  { tag: 'success', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 89, trending: false, indianContext: false, language: 'en', usageCount: 950 },
  { tag: 'growth', category: 'business', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 86, trending: false, indianContext: false, language: 'en', usageCount: 850 },

  // Food
  { tag: 'food', category: 'food', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 96, trending: true, indianContext: false, language: 'en', usageCount: 1600 },
  { tag: 'foodie', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 94, trending: true, indianContext: false, language: 'en', usageCount: 1400 },
  { tag: 'delicious', category: 'food', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 92, trending: false, indianContext: false, language: 'en', usageCount: 1200 },
  { tag: 'recipe', category: 'food', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 90, trending: true, indianContext: false, language: 'en', usageCount: 1100 },
  { tag: 'cooking', category: 'food', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 88, trending: false, indianContext: false, language: 'en', usageCount: 1000 },
  { tag: 'restaurant', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 85, trending: false, indianContext: false, language: 'en', usageCount: 800 },
  { tag: 'tasty', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 87, trending: false, indianContext: false, language: 'en', usageCount: 900 },

  // Travel
  { tag: 'travel', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 95, trending: true, indianContext: false, language: 'en', usageCount: 1500 },
  { tag: 'wanderlust', category: 'travel', platforms: ['instagram', 'facebook', 'twitter'], popularity: 89, trending: false, indianContext: false, language: 'en', usageCount: 1000 },
  { tag: 'adventure', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 87, trending: false, indianContext: false, language: 'en', usageCount: 900 },
  { tag: 'explore', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 91, trending: true, indianContext: false, language: 'en', usageCount: 1200 },
  { tag: 'vacation', category: 'travel', platforms: ['instagram', 'facebook', 'twitter'], popularity: 85, trending: false, indianContext: false, language: 'en', usageCount: 800 },
  { tag: 'tourism', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 83, trending: false, indianContext: false, language: 'en', usageCount: 700 },
  { tag: 'journey', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 86, trending: false, indianContext: false, language: 'en', usageCount: 850 },

  // Indian Context Hashtags
  { tag: 'india', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 98, trending: true, indianContext: true, language: 'en', usageCount: 2000 },
  { tag: 'indian', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 96, trending: true, indianContext: true, language: 'en', usageCount: 1800 },
  { tag: 'desi', category: 'lifestyle', platforms: ['instagram', 'facebook', 'twitter'], popularity: 92, trending: true, indianContext: true, language: 'en', usageCount: 1400 },
  { tag: 'bharat', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 89, trending: false, indianContext: true, language: 'en', usageCount: 1000 },
  { tag: 'hindustan', category: 'lifestyle', platforms: ['instagram', 'facebook', 'twitter'], popularity: 87, trending: false, indianContext: true, language: 'en', usageCount: 900 },
  { tag: 'proudindian', category: 'lifestyle', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 94, trending: true, indianContext: true, language: 'en', usageCount: 1300 },

  // Indian Cities
  { tag: 'mumbai', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 93, trending: true, indianContext: true, language: 'en', usageCount: 1200 },
  { tag: 'delhi', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 91, trending: true, indianContext: true, language: 'en', usageCount: 1100 },
  { tag: 'bangalore', category: 'travel', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 89, trending: false, indianContext: true, language: 'en', usageCount: 1000 },
  { tag: 'chennai', category: 'travel', platforms: ['instagram', 'facebook', 'twitter'], popularity: 85, trending: false, indianContext: true, language: 'en', usageCount: 800 },
  { tag: 'kolkata', category: 'travel', platforms: ['instagram', 'facebook', 'twitter'], popularity: 83, trending: false, indianContext: true, language: 'en', usageCount: 700 },
  { tag: 'hyderabad', category: 'travel', platforms: ['instagram', 'facebook', 'twitter'], popularity: 81, trending: false, indianContext: true, language: 'en', usageCount: 600 },
  { tag: 'pune', category: 'travel', platforms: ['instagram', 'facebook', 'twitter'], popularity: 79, trending: false, indianContext: true, language: 'en', usageCount: 500 },

  // Bollywood
  { tag: 'bollywood', category: 'entertainment', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 95, trending: true, indianContext: true, language: 'en', usageCount: 1500 },
  { tag: 'hindi', category: 'entertainment', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 90, trending: false, indianContext: true, language: 'en', usageCount: 1100 },
  { tag: 'movies', category: 'entertainment', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 88, trending: false, indianContext: false, language: 'en', usageCount: 1000 },
  { tag: 'entertainment', category: 'entertainment', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 86, trending: false, indianContext: false, language: 'en', usageCount: 900 },
  { tag: 'cinema', category: 'entertainment', platforms: ['instagram', 'facebook', 'twitter'], popularity: 84, trending: false, indianContext: false, language: 'en', usageCount: 800 },
  { tag: 'actors', category: 'entertainment', platforms: ['instagram', 'facebook', 'twitter'], popularity: 82, trending: false, indianContext: false, language: 'en', usageCount: 700 },

  // Cricket
  { tag: 'cricket', category: 'sports', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 97, trending: true, indianContext: true, language: 'en', usageCount: 1700 },
  { tag: 'ipl', category: 'sports', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 94, trending: true, indianContext: true, language: 'en', usageCount: 1400 },
  { tag: 'bcci', category: 'sports', platforms: ['instagram', 'facebook', 'twitter'], popularity: 88, trending: false, indianContext: true, language: 'en', usageCount: 1000 },
  { tag: 'sports', category: 'sports', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 85, trending: false, indianContext: false, language: 'en', usageCount: 900 },
  { tag: 'teamindia', category: 'sports', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 92, trending: true, indianContext: true, language: 'en', usageCount: 1200 },

  // Indian Food
  { tag: 'indianfood', category: 'food', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 96, trending: true, indianContext: true, language: 'en', usageCount: 1500 },
  { tag: 'spicy', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 89, trending: false, indianContext: true, language: 'en', usageCount: 1000 },
  { tag: 'curry', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 87, trending: false, indianContext: true, language: 'en', usageCount: 900 },
  { tag: 'biryani', category: 'food', platforms: ['instagram', 'facebook', 'youtube', 'twitter'], popularity: 93, trending: true, indianContext: true, language: 'en', usageCount: 1300 },
  { tag: 'dal', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 81, trending: false, indianContext: true, language: 'en', usageCount: 600 },
  { tag: 'roti', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 79, trending: false, indianContext: true, language: 'en', usageCount: 500 },
  { tag: 'naan', category: 'food', platforms: ['instagram', 'facebook', 'twitter'], popularity: 77, trending: false, indianContext: true, language: 'en', usageCount: 400 },

];

// Indian Festivals data
const indianFestivals = [
  {
    name: 'Diwali',
    date: new Date('2024-11-01'),
    hashtags: ['diwali', 'festivaloflights', 'deepavali', 'indianfestival', 'celebration', 'lights', 'rangoli', 'laxmi', 'festival'],
    description: 'The festival of lights celebrated across India',
    active: true
  },
  {
    name: 'Holi',
    date: new Date('2024-03-25'),
    hashtags: ['holi', 'festivalofcolors', 'colorful', 'spring', 'celebration', 'fun', 'colors', 'festival', 'indianfestival'],
    description: 'The festival of colors marking the arrival of spring',
    active: true
  },
  {
    name: 'Dussehra',
    date: new Date('2024-10-12'),
    hashtags: ['dussehra', 'vijayadashami', 'victory', 'goodoverevil', 'celebration', 'indianfestival', 'ramayana', 'festival'],
    description: 'Celebration of victory of good over evil',
    active: true
  },
  {
    name: 'Eid',
    date: new Date('2024-04-10'),
    hashtags: ['eid', 'eidmubarak', 'ramadan', 'festival', 'celebration', 'muslimfestival', 'islamic', 'festival'],
    description: 'Islamic festival marking the end of Ramadan',
    active: true
  },
  {
    name: 'Christmas',
    date: new Date('2024-12-25'),
    hashtags: ['christmas', 'xmas', 'festival', 'celebration', 'joy', 'peace', 'christianfestival', 'festival'],
    description: 'Christian festival celebrating the birth of Jesus Christ',
    active: true
  },
  {
    name: 'Republic Day',
    date: new Date('2024-01-26'),
    hashtags: ['republicday', 'india', 'patriotic', 'freedom', 'independence', 'proudindian', 'nationalfestival', 'festival'],
    description: 'Celebration of India becoming a republic',
    active: true
  },
  {
    name: 'Independence Day',
    date: new Date('2024-08-15'),
    hashtags: ['independenceday', 'india', 'patriotic', 'freedom', 'independence', 'proudindian', 'nationalfestival', 'festival'],
    description: 'Celebration of India\'s independence from British rule',
    active: true
  },
  {
    name: 'Ganesh Chaturthi',
    date: new Date('2024-09-07'),
    hashtags: ['ganeshchaturthi', 'ganpati', 'ganesh', 'festival', 'celebration', 'indianfestival', 'hindu', 'festival'],
    description: 'Festival celebrating the birth of Lord Ganesha',
    active: true
  },
  {
    name: 'Navratri',
    date: new Date('2024-10-03'),
    hashtags: ['navratri', 'dussehra', 'festival', 'celebration', 'indianfestival', 'hindu', 'festival', 'dance'],
    description: 'Nine nights of celebration dedicated to Goddess Durga',
    active: true
  },
  {
    name: 'Raksha Bandhan',
    date: new Date('2024-08-19'),
    hashtags: ['rakshabandhan', 'rakhi', 'festival', 'celebration', 'indianfestival', 'hindu', 'festival', 'brothersister'],
    description: 'Festival celebrating the bond between brothers and sisters',
    active: true
  }
];

export async function seedDatabase() {
  try {
    await connectDB();
    
    console.log('Starting database seeding...');
    
    // Clear existing data
    await Hashtag.deleteMany({});
    await IndianFestival.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert hashtags
    await Hashtag.insertMany(sampleHashtags);
    console.log(`Inserted ${sampleHashtags.length} hashtags`);
    
    // Insert festivals
    await IndianFestival.insertMany(indianFestivals);
    console.log(`Inserted ${indianFestivals.length} festivals`);
    
    console.log('Database seeding completed successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}
