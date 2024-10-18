import User from '../models/User.js';
import { generateToken, verifyPassword, decodeToken, verifyToken, authorizeAdmin } from '../utils/authUtils.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validatorUtils.js';

export const register = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        validateUsername(username);
        validatePassword(password);
        validateEmail(email);

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const user = await User.create({
            email: email,
            username: username,
            password: password,
        });
        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        validatePassword(password);
        validateEmail(email);

        const user = await User.findOne({ where: { email } });
        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        if (!user.password) {
            return res.status(400).json({ message: 'User registered via Google OAuth. Please log in with Google.' });
        }

        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user;

    try {
        if (user.id !== id && user.role !== 'admin') {
            return res.status(403).json({ error: "You are not authorized to access this user's information." });
        }

        const requestedUser = await User.findByPk(id);

        if (!requestedUser) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const userObj = {
            id: requestedUser.id,
            username: requestedUser.username,
            email: requestedUser.email,
            role: requestedUser.role,
            accountCreated: requestedUser.createdAt,
        };

        res.status(200).json({ user: userObj });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'role', 'createdAt'],
        });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserPassword = async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    try {
        if (user.id !== id && user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to update this user's password." });
        }

        validatePassword(newPassword);

        if (user.id === id && !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        await User.update({ password: newPassword }, { where: { id } });
        res.status(200).json({ message: 'Password Changed Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteUserAccount = async (req, res, next) => {
    const user = req.user;
    const { id } = req.params;
    const password = req.body.password;

    try {
        if (user.id !== id && user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to delete this user's account." });
        }

        if (user.id === id && !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        await User.destroy({ where: { id } });
        res.status(200).json({ message: 'Account Deleted Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
