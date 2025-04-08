import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './database/connection.js';
import { apiLimiter } from './middleware/rateLimit.middleware.js';
import { errorHandler } from './middleware/errorHandler.middleware.js';


dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(morgan('dev')); // Request logging
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all routes
app.use('/api', apiLimiter);

// Connect to MongoDB
connectDB();

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to E-waste Management API' });
});


import recyclerRoutes from './routes/recycler.routes.js';
import campaignRoutes from './routes/campaign.routes.js';
import blogRoutes from './routes/blog.routes.js';
import ewasteRoutes from './routes/ewaste.routes.js';

app.use('/api/recyclers', recyclerRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/ewaste', ewasteRoutes);



// Global error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});