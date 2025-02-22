require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const waitlistRoutes = require('./routes/waitlistRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Updated CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Routes
app.use('/api/waitlist', waitlistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});