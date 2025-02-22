import express from 'express';
import { Router } from 'express';
import { addToWaitlist } from '../controllers/waitlistController.js';  // Add .js extension

const router = Router();

router.post('/submit', addToWaitlist);

export default router;