import User from '../models/User.js';
import Category from '../models/Category.js';
import Element from '../models/element.js';
import Snippet from '../models/Snippet.js';
import ElementGroup from '../models/ElementGroup.js';
import { Op } from 'sequelize';
import { generateToken, verifyPassword, decodeToken, verifyToken, authorizeAdmin } from '../utils/authUtils.js';
import { validateEmail, validatePassword, validateUsername } from '../utils/validatorUtils.js';

// Create Element Controller
export const createElement = async (req, res) => {
    const { name, description, categoryIds = [] } = req.body;
    // const userId = req.user.id;

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const element = await Element.create({ name, description, userId });

        if (categoryIds.length > 0) {
            const categories = await Category.findAll({ where: { id: categoryIds } });
            await element.addCategories(categories);
        }
        res.status(201).json({ element });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getElements = async (req, res) => {
    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        // const userId = req.user ? req.user.id : null;
        const elements = await Element.findAll({
            where: {
                [Op.or]: [
                    userId ? { userId: userId } : null, // Match the current user's ID
                    { '$User.role$': 'admin' }, // Check if the user role is admin
                ],
            },
            include: [
                {
                    model: Category,
                    through: { attributes: [] },
                    required: false,
                }, // Include categories
                { model: Snippet }, // Include snippets
                { model: User }, // Include User to access the role
                {
                    model: ElementGroup, // Include the element groups
                    through: { attributes: [] }, // Exclude join table attributes
                },
            ],
        });

        // Check if any elements were found
        if (!elements.length) {
            return res.status(404).json({ message: 'No elements found for this user.' });
        }

        res.status(200).json({ elements });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getElementById = async (req, res) => {
    const { id } = req.params;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const element = await Element.findOne({
            where: {
                id, // Match the element ID
                [Op.or]: [
                    { userId: userId }, // Match the current user's ID
                    { '$User.role$': 'admin' }, // Match if created by an admin user
                ],
            },
            include: [
                { model: Category }, // Include category
                { model: Snippet }, // Include snippets
                { model: User }, // Include User to access the role
            ],
        });

        if (!element) return res.status(404).json({ message: 'Element not found' });

        res.status(200).json({ element });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Elements by Group ID
export const getElementsByGroup = async (req, res) => {
    const { id: groupId } = req.params;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const group = await ElementGroup.findOne({
            where: { id: groupId, userId }, // Check if the group belongs to the user
        });
        if (!group) return res.status(404).json({ message: 'Element group not found' });

        const elements = await Element.findAll({
            where: {
                [Op.or]: [
                    { userId: userId }, // Match the current user's ID
                    { '$User.role$': 'admin' }, // Check if the user role is admin
                ],
            },
            include: [
                {
                    model: ElementGroup,
                    where: { id: groupId }, // Ensure the elements are associated with the specified group
                    through: { attributes: [] }, // Exclude join table attributes
                },
                { model: Category }, // Include categories
                { model: Snippet }, // Include snippets
                { model: User, attributes: ['id', 'role'] }, // Include User to access the role
            ],
        });

        res.status(200).json({ elements });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Element
export const updateElement = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    // const userId = req.user.id;

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const element = await Element.findOne({ where: { id, userId } });
        if (!element) return res.status(404).json({ message: 'Element not found' });

        element.name = name || element.name;
        element.description = description || element.description;
        await element.save();
        res.status(200).json({ element });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Element
export const deleteElement = async (req, res) => {
    const { id } = req.params;
    // const userId = req.user.id;

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const element = await Element.findOne({ where: { id, userId } });
        if (!element) return res.status(404).json({ message: 'Element not found' });

        await element.destroy();
        res.status(200).json({ message: 'Element deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
