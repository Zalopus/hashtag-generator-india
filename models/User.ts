import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  preferences: {
    platforms: ('facebook' | 'instagram' | 'youtube')[];
    categories: string[];
  };
  savedHashtags: Array<{
    name: string;
    hashtags: string[];
    platform: 'facebook' | 'instagram' | 'youtube';
    category: string;
    createdAt: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  preferences: {
    platforms: [{
      type: String,
      enum: ['facebook', 'instagram', 'youtube', 'twitter'],
      default: ['instagram']
    }],
    categories: [{
      type: String,
      default: ['lifestyle', 'business', 'food', 'travel']
    }],
  },
  savedHashtags: [{
    name: {
      type: String,
      required: true
    },
    hashtags: [{
      type: String,
      required: true
    }],
    platform: {
      type: String,
      enum: ['facebook', 'instagram', 'youtube', 'twitter'],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
