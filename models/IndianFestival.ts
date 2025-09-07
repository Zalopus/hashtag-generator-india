import mongoose, { Schema, Document } from 'mongoose';

export interface IIndianFestival extends Document {
  name: string;
  date: Date;
  hashtags: string[];
  description: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const IndianFestivalSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Festival name is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Festival date is required'],
    index: true
  },
  hashtags: [{
    type: String,
    required: true,
    trim: true
  }],
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  active: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Index for finding active festivals by date
IndianFestivalSchema.index({ date: 1, active: 1 });

export default mongoose.models.IndianFestival || mongoose.model<IIndianFestival>('IndianFestival', IndianFestivalSchema);
