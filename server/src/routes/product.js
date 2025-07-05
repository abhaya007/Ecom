import  { Router } from "express";
import Product from "../models/product.js";

const productRouter = Router();

productRouter.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, message: 'Product created' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});
productRouter.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error', error: err });
  }
});

export default productRouter;