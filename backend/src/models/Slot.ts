import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISlot extends Document {
  experienceId: Types.ObjectId;
  date: Date;
  time: string;
  availableSpots: number;
  totalSpots: number;
  createdAt: Date;
  updatedAt: Date;
}

const SlotSchema = new Schema<ISlot>(
  {
    experienceId: {
      type: Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    availableSpots: {
      type: Number,
      required: true,
      min: 0,
    },
    totalSpots: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

SlotSchema.index({ experienceId: 1, date: 1 });

const Slot = mongoose.model<ISlot>('Slot', SlotSchema);

export default Slot;
