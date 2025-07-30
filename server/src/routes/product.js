import  { Router } from "express";
import Product from "../models/product.js";

const productRouter = Router();

// Create product
productRouter.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});

// Get all products
productRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});

// Update product
productRouter.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});

// Delete product
productRouter.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    // Optionally, return all products after deletion for frontend sync
    const products = await Product.find();
    res.status(200).json({ success: true, message: 'Product deleted', products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});


export default productRouter;