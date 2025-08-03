import  { Router } from "express";
import Product from "../models/product.js";
const productRouter = Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads');
  },  
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Create product
productRouter.post('/products', upload.single('uploadedFiles'), async (req, res) => {
  try {
    const productData = {...req.body};
    productData.imageName = req.file?.filename
    const product = new Product(productData);
    const savedProudct = await product.save();
    res.status(201).json({ success: true, savedProudct });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});

// Get all products
productRouter.get('/products', async (req, res) => {
  try {
    const totalDbProducts = await Product.countDocuments();
    const products = await Product.find()
    .skip((req.query.page - 1) * req.query.pageSize)
    .limit(parseInt(req.query.pageSize));
    res.status(200).json({ success: true, products, totalDbProducts });
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