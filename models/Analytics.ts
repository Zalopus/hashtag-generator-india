import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  userId?: string;
  action: 'generate' | 'save' | 'copy' | 'share';
  platform: string;
  category: string;
  hashtagCount: number;
  timestamp: Date;
}

const AnalyticsSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  action: {
    type: String,
    enum: ['generate', 'save', 'copy', 'share'],
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  hashtagCount: {
    type: Number,
    required: true,
    min: 0
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: false
});

// Indexes for analytics queries
AnalyticsSchema.index({ timestamp: -1 });
AnalyticsSchema.index({ action: 1, platform: 1 });
AnalyticsSchema.index({ category: 1, timestamp: -1 });

export default mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
