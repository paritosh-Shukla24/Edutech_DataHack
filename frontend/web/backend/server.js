import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'; // Ensure the path is correct
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5001; // Change the port if necessary
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
