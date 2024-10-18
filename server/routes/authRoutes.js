import express from 'express';
import { googleLogin, googleCallback, googleCallbackRedirect, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/google', googleLogin);
router.get('/google/callback', googleCallback, googleCallbackRedirect);
router.get('/logout', logout);

export default router;
