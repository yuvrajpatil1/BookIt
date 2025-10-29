import express from 'express';
import mongoose from 'mongoose';
import Experience from '../models/Experience';
import Slot from '../models/Slot';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ error: 'Failed to fetch experiences' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid experience ID format' });
    }

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    const slots = await Slot.find({
      experienceId: id,
      availableSpots: { $gt: 0 }
    }).sort({ date: 1, time: 1 });

    const experienceWithSlots = {
      ...experience.toObject(),
      slots
    };

    res.json(experienceWithSlots);
  } catch (error) {
    console.error('Error fetching experience:', error);
    res.status(500).json({ error: 'Failed to fetch experience details' });
  }
});

export default router;
