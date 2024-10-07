import express from 'express';
import { createElementGroup, updateElementGroup, deleteElementGroup } from '../controllers/elementGroupController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/create', createElementGroup);
router.put('/:id', updateElementGroup);
router.delete('/:id', deleteElementGroup);

export default router;
