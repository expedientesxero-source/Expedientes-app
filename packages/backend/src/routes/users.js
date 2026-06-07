const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, phone, company } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, phone, company },
      { new: true }
    ).select('-password');
    
    res.json({ message: '✅ Profile updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
