// backend/src/index.js
require('dotenv').config(); // load .env variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// create express app
const app = express();

// ------------------- MIDDLEWARE ------------------- //

// Security headers
app.use(helmet());

// Logging requests
app.use(morgan('combined'));

// Limit repeated requests to prevent brute-force
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// Enable CORS only for your frontend domain(s)
app.use(
  cors({
    origin: ['https://e-commerce-website-98wd.vercel.app'], // your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Parse JSON requests
app.use(express.json());

// ------------------- ROUTES ------------------- //
const authRoutes = require('./src/routes/auth');
const productRoutes = require('./src/routes/product');
const orderRoutes = require('./src/routes/orders');
const userRoutes = require('./src/routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'E-commerce API is running...' });
});

// ------------------- ERROR HANDLER ------------------- //
// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// ------------------- DATABASE CONNECTION ------------------- //
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT} in production mode`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
