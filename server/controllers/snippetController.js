import User from '../models/User.js';
import Category from '../models/Category.js';
import Element from '../models/element.js';
import Snippet from '../models/Snippet.js';
import ElementGroup from '../models/ElementGroup.js';
import { generateToken, verifyPassword, decodeToken, verifyToken, authorizeAdmin } from '../utils/authUtils.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validatorUtils.js';
import { Op } from 'sequelize';

// Create Snippet Controller (for a specific element)
export const createSnippet = async (req, res) => {
    const { name, description, code, output } = req.body;
    // const userId = req.user.id; // Get the ID of the currently logged-in user

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const element = await Element.findByPk(elementId);
        if (!element) {
            return res.status(404).json({ message: 'Element not found' });
        }

        // Create the snippet associated with the element and the user
        const snippet = await Snippet.create({ name, description, code, output, elementId, userId });
        res.status(201).json({ snippet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Snippet
export const updateSnippet = async (req, res) => {
    const { id } = req.params;
    const { name, description, code, output } = req.body;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        // Find the snippet by its ID and ensure the userId matches
        const snippet = await Snippet.findOne({ where: { id, userId } });
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found or you do not have permission to update it' });
        }

        snippet.name = name || snippet.name;
        snippet.description = description || snippet.description;
        snippet.code = code || snippet.code;
        snippet.output = output || snippet.output;
        await snippet.save();
        res.status(200).json({ snippet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Snippet
export const deleteSnippet = async (req, res) => {
    const { id } = req.params;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        // Find the snippet by its ID and ensure the userId matches
        const snippet = await Snippet.findOne({ where: { id, userId } });
        if (!snippet) {
            return res.status(404).json({ message: 'Snippet not found or you do not have permission to delete it' });
        }

        await snippet.destroy();
        res.status(200).json({ message: 'Snippet deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
