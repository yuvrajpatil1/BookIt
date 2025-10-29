import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;
  description: string;
  location: string;
  duration: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  highlights: string[];
  included: string[];
  notIncluded: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    images: {
      type: [String],
      required: true,
      default: [],
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 5.0,
    },
    reviews: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    category: {
      type: String,
      required: true,
    },
    highlights: {
      type: [String],
      required: true,
      default: [],
    },
    included: {
      type: [String],
      required: true,
      default: [],
    },
    notIncluded: {
      type: [String],
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model<IExperience>('Experience', ExperienceSchema);

export default Experience;
