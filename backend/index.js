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

// In index.js
app.use(cors({
  origin: ['https://regen-root.vercel.app', 'http://localhost:3000'], // or whatever port your Next.js app is running on
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));


app.use(express.json());

// API Routes
app.use('/api/waitlist', waitlistRoutes);

// Serve static files from the Next.js build
// if (process.env.NODE_ENV === 'production') {
  // Serve the static files
  // app.use(express.static(path.join(__dirname, '../frontend/out')));
  
  // // Serve the CSS files with correct MIME type
  // app.use('/_next', express.static(path.join(__dirname, '../frontend/out/_next'), {
  //   setHeaders: (res, path) => {
  //     if (path.endsWith('.css')) {
  //       res.setHeader('Content-Type', 'text/css');
  //     }
  //   }
  // }));

  // app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, '../frontend/out/index.html'));
  // });
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});