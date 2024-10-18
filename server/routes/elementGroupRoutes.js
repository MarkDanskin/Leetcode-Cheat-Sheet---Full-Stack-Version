import express from 'express';
import { createElementGroup, updateElementGroup, deleteElementGroup } from '../controllers/elementGroupController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/create', authenticate, createElementGroup);
router.put('/:id', authenticate, updateElementGroup);
router.delete('/:id', authenticate, deleteElementGroup);

export default router;
