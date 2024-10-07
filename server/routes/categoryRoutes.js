import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import authenticate from '../middleware/authenticationMiddleware.js'; // Admin access required

const router = express.Router();

// Admin-only category operations
router.post('/create', createCategory); // Create Category
router.get('/', getCategories); // Get All Categories
router.put('/:id', updateCategory); // Update Category
router.delete('/:id', deleteCategory); // Delete Category

export default router;
