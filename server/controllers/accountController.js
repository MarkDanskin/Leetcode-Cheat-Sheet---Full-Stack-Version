import User from '../models/User.js';
import Category from '../models/Category.js';
import Element from '../models/element.js';
import Snippet from '../models/Snippet.js';
import ElementGroup from '../models/ElementGroup.js';
import { generateToken, verifyPassword, decodeToken, verifyToken, authorizeAdmin } from '../utils/authUtils.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validatorUtils.js';

// Account Registration Controller
export const register = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try {
        validateUsername(username);
        validatePassword(password);
        validateEmail(email);
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

// Login Controller
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
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Fetch user by ID (authenticated)
export const getUser = async (req, res, next) => {
    const { id } = req.params; // Assuming the ID is passed in the route parameters
    const user = req.user;

    try {
        // Check if the requesting user is the same as the requested user or if they are an admin
        if (user.id !== id && user.role !== 'admin') {
            return res.status(403).json({ error: "You are not authorized to access this user's information." });
        }

        // Fetch the user by ID
        const requestedUser = await User.findByPk(id); // Ensure you import your User model

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

// Admin: Get all users
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

// Change Password Controller
export const updateUserPassword = async (req, res, next) => {
    const user = req.user;
    const { id } = req.params; // Extract user ID from the request parameters
    const password = req.body.password;
    const newPassword = req.body.newPassword;

    try {
        // Check if the user is updating their own password or is an admin
        if (user.id !== id && user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to update this user's password." });
        }

        validatePassword(newPassword);

        // Verify the current password if the user is updating their own password
        if (user.id === id && !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        await User.update({ password: newPassword }, { where: { id } });
        res.status(200).json({ message: 'Password Changed Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete User Controller
export const deleteUserAccount = async (req, res, next) => {
    const user = req.user;
    const { id } = req.params; // Extract user ID from the request parameters
    const password = req.body.password;

    try {
        // Check if the user is deleting their own account or is an admin
        if (user.id !== id && user.role !== 'admin') {
            return res.status(403).json({ message: "You are not authorized to delete this user's account." });
        }

        // Verify the password if the user is deleting their own account
        if (user.id === id && !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        await User.destroy({ where: { id } });
        res.status(200).json({ message: 'Account Deleted Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
