import User from '../models/User.js';
import Element from '../models/element.js';
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

// Fetch User Controller
export const getUser = async (req, res, next) => {
    const user = req.user;
    try {
        const userObj = {
            id: user.id,
            username: user.username,
            email: user.email,
            accountCreated: user.createdAt,
        };
        res.status(200).json({ userObj });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Change Password Controller
export const updateUserPassword = async (req, res, next) => {
    const user = req.user;
    const id = user.id;
    const password = req.body.password;
    const newPassword = req.body.newPassword;
    try {
        validatePassword(newPassword);
        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        await User.update({ password: newPassword }, { where: { id: id } });
        res.status(200).json({ message: 'Password Changed Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete User Controller
export const deleteUserAccount = async (req, res, next) => {
    const user = req.user;
    const id = user.id;
    const password = req.body.password;
    try {
        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        await User.destroy({ where: { id: id } });
        res.status(200).json({ message: 'Account Deleted Successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Elements Controller
export const getElements = async (req, res, next) => {
    try {
        const elements = await Element.findAll();
        res.status(200).json({ elements });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create Element
export const createElement = async (req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    try {
        const elementInfo = {
            name: name,
            description: description,
        };
        const element = await Element.create(elementInfo);
        res.status(201).json({ element });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
