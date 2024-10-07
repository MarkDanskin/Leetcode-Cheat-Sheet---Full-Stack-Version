import express from 'express';
import { register, login, getUser, updateUserPassword, deleteUserAccount, getAllUsers } from '../controllers/accountController.js';
import authenticate from '../middleware/authenticationMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/user', getUser);
router.get('/user/all', getAllUsers);
router.put('/changePassword', updateUserPassword);
router.delete('/deleteUserAccount', deleteUserAccount);

export default router;
