// index.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';  // Note: add .js extension
import waitlistRoutes from './routes/waitlistRoutes.js';  // Note: add .js extension


dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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