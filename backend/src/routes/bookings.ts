import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Booking from '../models/Booking';
import Slot from '../models/Slot';
import Experience from '../models/Experience';

const router = express.Router();

router.post(
  '/',
  [
    body('experienceId').isMongoId(),
    body('slotId').isMongoId(),
    body('customerName').trim().notEmpty(),
    body('customerEmail').isEmail(),
    body('customerPhone').trim().notEmpty(),
    body('numberOfGuests').isInt({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const {
        experienceId,
        slotId,
        customerName,
        customerEmail,
        customerPhone,
        numberOfGuests,
        promoCode,
        discount,
        totalPrice
      } = req.body;

      const slot = await Slot.findById(slotId).session(session);

      if (!slot) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ error: 'Slot not found' });
      }

      if (slot.availableSpots < numberOfGuests) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ error: 'Not enough available spots' });
      }

      slot.availableSpots -= numberOfGuests;
      await slot.save({ session });

      const booking = await Booking.create(
        [{
          experienceId,
          slotId,
          customerName,
          customerEmail,
          customerPhone,
          numberOfGuests,
          promoCode: promoCode || undefined,
          discount: discount || 0,
          totalPrice,
          status: 'confirmed'
        }],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      const bookingWithDetails = await Booking.findById(booking[0]._id)
        .populate('experienceId')
        .populate('slotId');

      res.status(201).json(bookingWithDetails);
    } catch (error) {
      if (session.inTransaction()) {
        await session.abortTransaction();
      }
      session.endSession();
      console.error('Error creating booking:', error);
      res.status(500).json({ error: 'Failed to create booking' });
    }
  }
);

export default router;
