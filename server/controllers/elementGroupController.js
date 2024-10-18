import Element from '../models/Element.js';
import ElementGroup from '../models/ElementGroup.js';

export const createElementGroup = async (req, res) => {
    const { name, elementIds = [] } = req.body;
    const userId = req.user.id;

    try {
        const group = await ElementGroup.create({ name, userId });
        const elements = await Element.findAll({ where: { id: elementIds } });
        await group.addElements(elements);

        res.status(201).json({ group });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateElementGroup = async (req, res) => {
    const { id } = req.params;
    const { name, elementIds = [] } = req.body;
    const userId = req.user.id;

    try {
        const group = await ElementGroup.findOne({ where: { id, userId } });
        if (!group) return res.status(404).json({ message: 'Element group not found' });

        group.name = name || group.name;
        await group.save();

        if (elementIds.length > 0) {
            const elements = await Element.findAll({ where: { id: elementIds } });
            await group.setElements(elements);
        }

        res.status(200).json({ group });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteElementGroup = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const group = await ElementGroup.findOne({ where: { id, userId } });
        if (!group) return res.status(404).json({ message: 'Element group not found' });

        await group.destroy();
        res.status(200).json({ message: 'Element group deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
