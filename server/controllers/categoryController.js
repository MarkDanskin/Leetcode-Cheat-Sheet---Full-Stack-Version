import User from '../models/User.js';
import Category from '../models/Category.js';
import Element from '../models/element.js';
import Snippet from '../models/Snippet.js';
import ElementGroup from '../models/ElementGroup.js';
import { Op } from 'sequelize';

// Create Category
export const createCategory = async (req, res) => {
    const { name } = req.body;
    // const userId = req.user.id; // Get the ID of the currently logged-in user

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const category = await Category.create({ name, userId }); // Associate the category with the user who created it
        res.status(201).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get Categories
export const getCategories = async (req, res) => {
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const categories = await Category.findAll({
            where: {
                [Op.or]: [
                    { userId: userId }, // Match the current user's ID
                    { '$User.role$': 'admin' }, // Check if the category was created by an admin
                ],
            },
            include: [
                { model: User }, // Include User to access the role
            ],
        });
        res.status(200).json({ categories });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Category
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const category = await Category.findOne({ where: { id, userId } }); // Only allow update if the userId matches
        if (!category) return res.status(404).json({ message: 'Category not found or you do not have permission to update it' });

        category.name = name || category.name;
        await category.save();
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Category
export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const category = await Category.findOne({ where: { id, userId } }); // Only allow deletion if the userId matches
        if (!category) return res.status(404).json({ message: 'Category not found or you do not have permission to delete it' });

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
