import express from 'express';
import { register, login, getUser, updateUserPassword, deleteUserAccount, getAllUsers } from '../controllers/accountController.js';
import authenticate from '../middleware/authenticationMiddleware.js';
import authorize from '../middleware/authorizationMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', authenticate, getUser);
router.get('/user/all', authenticate, authorize, getAllUsers);
router.put('/changePassword', authenticate, updateUserPassword);
router.delete('/deleteUserAccount', authenticate, deleteUserAccount);

export default router;
