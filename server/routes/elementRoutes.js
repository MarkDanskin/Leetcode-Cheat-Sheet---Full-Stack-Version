import express from 'express';
import { createElement, getElements, updateElement, deleteElement, getElementsByGroup, getElementById } from '../controllers/elementController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/create', authenticate, createElement);
router.get('/', getElements);
router.get('/:id', authenticate, getElementById);
router.get('/group/:id', authenticate, getElementsByGroup);
router.put('/:id', authenticate, updateElement);
router.delete('/:id', authenticate, deleteElement);

export default router;
