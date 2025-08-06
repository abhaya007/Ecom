// import { Router } from 'express';
// import Category from '../models/category.js';
// const categoryRouter = Router();


// // List all categories
// categoryRouter.get('/categories', async (req, res) => {
//   const categories = await Category.find();
//   res.json(categories);
// });

// // Get single category
// categoryRouter.get('/categories/:id', async (req, res) => {
//   const category = await Category.findById(req.params.id);
//   res.json(category);
// });

// // Add new category
// categoryRouter.post('/categories', async (req, res) => {
//   const category = new Category(req.body);
//   await category.save();
//   res.status(201).json(category);
// });

// // Update category
// categoryRouter.put('/categories/:id', async (req, res) => {
//   const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(category);
// });

// // Delete category
// categoryRouter.delete('/categories/:id', async (req, res) => {
//   await Category.findByIdAndDelete(req.params.id);
//   res.json({ message: 'Category deleted' });
// });

// export default categoryRouter;