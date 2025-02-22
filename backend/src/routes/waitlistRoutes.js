const express = require('express');
const router = express.Router();
const { addToWaitlist } = require('../controllers/waitlistController');

router.post('/submit', addToWaitlist);

module.exports = router;