const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/create-admin
const { auth, admin } = require('../middleware/auth');

router.post('/create-admin', auth, admin, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ name, email, passwordHash, isAdmin: true });
    await user.save();

    res.status(201).json({ message: 'Admin user created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    // hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // create user
    const user = new User({ name, email, passwordHash });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // check user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // verify password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // generate token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
