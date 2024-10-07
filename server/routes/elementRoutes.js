import express from 'express';
import { createElement, getElements, updateElement, deleteElement, getElementsByGroup, getElementById } from '../controllers/elementController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/create', createElement); // Create Element
router.get('/', getElements); // Get All Elements
router.get('/:id', getElementById); // Get An Element By ID
router.get('/group/:id', getElementsByGroup); // Get All Elements Belonging To A Group
router.put('/:id', updateElement); // Update Element
router.delete('/:id', deleteElement); // Delete Element

export default router;
