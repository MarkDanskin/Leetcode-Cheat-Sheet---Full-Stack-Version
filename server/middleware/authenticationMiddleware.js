import { verifyToken } from '../utils/authUtils.js';
import User from '../models/User.js';

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token missing from authorization header' });
        }
        const decoded = verifyToken(token);
        const id = decoded.id;

        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: Authentication Required' });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid Token' });
    }
};

export default authenticate;
