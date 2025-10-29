import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  experienceId: Types.ObjectId;
  slotId: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  numberOfGuests: number;
  promoCode?: string;
  discount: number;
  totalPrice: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    customerPhone: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    promoCode: {
      type: String,
      trim: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      required: true,
      enum: ['confirmed', 'cancelled', 'completed'],
      default: 'confirmed',
    },
  },
  {
    timestamps: true,
  }
);

BookingSchema.index({ customerEmail: 1 });
BookingSchema.index({ slotId: 1 });

const Booking = mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
