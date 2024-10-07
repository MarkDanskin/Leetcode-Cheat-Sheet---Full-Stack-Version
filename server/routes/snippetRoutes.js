import express from 'express';
import { createSnippet, updateSnippet, deleteSnippet } from '../controllers/snippetController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/create', createSnippet); // Create Snippet
router.put('/:id', updateSnippet); // Update Snippet
router.delete('/:id', deleteSnippet); // Delete Snippet

export default router;
