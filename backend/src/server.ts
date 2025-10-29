import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import experiencesRouter from './routes/experiences';
import bookingsRouter from './routes/bookings';
import promoRouter from './routes/promo';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/experiences', experiencesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/promo', promoRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'BookIt API is running' });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
