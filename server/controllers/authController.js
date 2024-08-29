import User from '../models/User.js';
import { generateToken, verifyPassword } from '../utils/authUtils.js';

export const register = async (req, res) => {
    try {
        req.body.role = 'User';
        const user = await User.create(req.body);
        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
