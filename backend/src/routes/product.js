const express = require('express');
const Product = require('../models/Product');
const { auth, admin } = require('../middleware/auth');

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q || "";
    const products = await Product.find({
      $or: [
        { title: { $regex: query, $options: "i" } }, // case insensitive
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error searching products" });
  }
});

// GET /api/products - list all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().limit(50);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id - single product details
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/products - create new product (admin only)
router.post('/', auth, admin, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/products/:id - update product (admin only)
router.put('/:id', auth, admin, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/products/:id - delete product (admin only)
router.delete('/:id', auth, admin, async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
