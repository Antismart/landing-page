const Waitlist = require('../models/Waitlist');

exports.addToWaitlist = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    
    const existingUser = await Waitlist.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    const waitlistEntry = new Waitlist({
      firstName,
      lastName,
      email
    });

    await waitlistEntry.save();

    res.status(201).json({
      success: true,
      message: 'Successfully joined waitlist'
    });
  } catch (error) {
    console.error('Waitlist submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};