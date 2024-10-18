import express from 'express';
import { createSnippet, updateSnippet, deleteSnippet } from '../controllers/snippetController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/create', authenticate, createSnippet);
router.put('/:id', authenticate, updateSnippet);
router.delete('/:id', authenticate, deleteSnippet);

export default router;
