import mongoose, { Schema, Document } from 'mongoose';

export interface IHashtag extends Document {
  tag: string;
  category: string;
  platforms: ('facebook' | 'instagram' | 'youtube')[];
  popularity: number;
  trending: boolean;
  indianContext: boolean;
  language: 'en' | 'hi';
  usageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const HashtagSchema: Schema = new Schema({
  tag: {
    type: String,
    required: [true, 'Hashtag is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'lifestyle', 'business', 'food', 'travel', 'fashion', 'beauty',
      'fitness', 'technology', 'education', 'entertainment', 'news',
      'sports', 'health', 'finance', 'real-estate', 'automotive',
      'photography', 'art', 'music', 'books', 'gaming', 'parenting',
      'wedding', 'festival', 'culture', 'politics', 'environment'
    ],
    index: true
  },
  platforms: [{
    type: String,
    enum: ['facebook', 'instagram', 'youtube', 'twitter'],
    required: true
  }],
  popularity: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  trending: {
    type: Boolean,
    default: false,
    index: true
  },
  indianContext: {
    type: Boolean,
    default: false,
    index: true
  },
  language: {
    type: String,
    default: 'en',
    index: true
  },
  usageCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

// Indexes for better query performance
HashtagSchema.index({ category: 1, platforms: 1 });
HashtagSchema.index({ trending: 1, popularity: -1 });
HashtagSchema.index({ indianContext: 1, language: 1 });
HashtagSchema.index({ usageCount: -1 });

export default mongoose.models.Hashtag || mongoose.model<IHashtag>('Hashtag', HashtagSchema);
