import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import programRoutes from './routes/programRoutes.js';
import batchRoutes from './routes/batchRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import tutorProfileRoutes from './routes/tutorProfileRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import tagRoutes from './routes/tagRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ message: 'API is running!', status: 'healthy' });
});

app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tutor-profiles', tutorProfileRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tags', tagRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {},
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
