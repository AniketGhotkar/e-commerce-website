const express = require('express');
const Order = require('../models/Order');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

// Create order (user)
router.post('/', auth, async (req, res) => {
  try {
    const { products, totalPrice, shippingAddress } = req.body;

    const order = new Order({
      user: req.user.id,
      products,
      totalPrice,
      shippingAddress
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders for logged-in user
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders (admin)
router.get('/', auth, admin, async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update order status (admin)
router.put('/:id/status', auth, admin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
