require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const waitlistRoutes = require('./routes/waitlistRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/waitlist', waitlistRoutes);

// Serve static files from the Next.js build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/out')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});