import User from '../models/User.js';
import Category from '../models/Category.js';
import { Op } from 'sequelize';

export const createCategory = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const category = await Category.create({ name, userId });
        res.status(201).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getCategories = async (req, res) => {
    const userId = req.user.id;

    try {
        const categories = await Category.findAll({
            where: {
                [Op.or]: [{ userId: userId }, { '$User.role$': 'admin' }],
            },
            include: [{ model: User }],
        });
        res.status(200).json({ categories });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const category = await Category.findOne({ where: { id, userId } });
        if (!category) return res.status(404).json({ message: 'Category not found or you do not have permission to update it' });

        category.name = name || category.name;
        await category.save();
        res.status(200).json({ category });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const category = await Category.findOne({ where: { id, userId } });
        if (!category) return res.status(404).json({ message: 'Category not found or you do not have permission to delete it' });

        await category.destroy();
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
