// backend/src/index.js
require('dotenv').config(); // load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// create express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// after app.use(express.json());
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./src/routes/product');
app.use('/api/products', productRoutes);

const orderRoutes = require('./src/routes/orders');
app.use('/api/orders', orderRoutes);

const userRoutes = require('./src/routes/users');
app.use('/api/users', userRoutes);


// simple test route
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running...' });
});

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  // start server only after DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
