import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import HttpError from './errorUtils.js';

// Generates a JWT based on a userID, Username, and UserRole
export const generateToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Verifies a password compared to an already hashed password using bcrypt, return a boolean
export const verifyPassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

// Verifies the legitimacy of a JWT
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

// Returns a decoded token
export const decodeToken = (token) => {
    if (!token || !verifyToken(token)) {
        throw new HttpError('invalid token', 400);
    }
    return jwt.decode(token);
};

export const authorizeAdmin = async (token) => {
    const id = decodeToken(token).id;
    const user = await User.findOne({ where: { id } });
    if (user.role === 'Admin') {
        return true;
    }
    return false;
};
