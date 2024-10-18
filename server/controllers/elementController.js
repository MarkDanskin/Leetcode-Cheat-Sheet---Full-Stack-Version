import User from '../models/User.js';
import Category from '../models/Category.js';
import Element from '../models/Element.js';
import Snippet from '../models/Snippet.js';
import ElementGroup from '../models/ElementGroup.js';
import { Op } from 'sequelize';

export const createElement = async (req, res) => {
    const { name, description, categoryIds = [] } = req.body;
    const userId = req.user.id;

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
    const userId = req.user ? req.user.id : null;

    try {
        const elements = await Element.findAll({
            where: {
                [Op.or]: [userId ? { userId: userId } : null, { '$User.role$': 'admin' }],
            },
            include: [
                {
                    model: Category,
                    through: { attributes: [] },
                    required: false,
                },
                { model: Snippet },
                { model: User },
                {
                    model: ElementGroup,
                    through: { attributes: [] },
                },
            ],
        });

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
    const userId = req.user.id;

    try {
        const element = await Element.findOne({
            where: {
                id,
                [Op.or]: [{ userId: userId }, { '$User.role$': 'admin' }],
            },
            include: [{ model: Category }, { model: Snippet }, { model: User }],
        });

        if (!element) return res.status(404).json({ message: 'Element not found' });

        res.status(200).json({ element });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getElementsByGroup = async (req, res) => {
    const { id: groupId } = req.params;
    const userId = req.user.id;

    try {
        const group = await ElementGroup.findOne({
            where: { id: groupId, userId },
        });
        if (!group) return res.status(404).json({ message: 'Element group not found' });

        const elements = await Element.findAll({
            where: {
                [Op.or]: [{ userId: userId }, { '$User.role$': 'admin' }],
            },
            include: [
                {
                    model: ElementGroup,
                    where: { id: groupId },
                    through: { attributes: [] },
                },
                { model: Category },
                { model: Snippet },
                { model: User, attributes: ['id', 'role'] },
            ],
        });

        res.status(200).json({ elements });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateElement = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const userId = req.user.id;

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

export const deleteElement = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const element = await Element.findOne({ where: { id, userId } });
        if (!element) return res.status(404).json({ message: 'Element not found' });

        await element.destroy();
        res.status(200).json({ message: 'Element deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
