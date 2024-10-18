import Element from '../models/Element.js';
import Snippet from '../models/Snippet.js';

export const createSnippet = async (req, res) => {
    const { name, description, code, output } = req.body;
    const userId = req.user.id;

    try {
        const element = await Element.findByPk(elementId);
        if (!element) {
            return res.status(404).json({ message: 'Element not found' });
        }

        const snippet = await Snippet.create({ name, description, code, output, elementId, userId });
        res.status(201).json({ snippet });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateSnippet = async (req, res) => {
    const { id } = req.params;
    const { name, description, code, output } = req.body;
    const userId = req.user.id;

    try {
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

export const deleteSnippet = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
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
