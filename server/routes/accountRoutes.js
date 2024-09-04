import express from 'express';
import { register, login, getUser, updateUserPassword, deleteUserAccount, getElements } from '../controllers/accountController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, getUser);
router.put('/changePassword', authenticate, updateUserPassword);
router.delete('/deleteUserAccount', authenticate, deleteUserAccount);
router.get('/elements', getElements);

export default router;
