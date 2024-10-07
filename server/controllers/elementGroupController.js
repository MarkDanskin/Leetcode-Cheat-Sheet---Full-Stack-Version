import User from '../models/User.js';
import Category from '../models/Category.js';
import Element from '../models/element.js';
import Snippet from '../models/Snippet.js';
import ElementGroup from '../models/ElementGroup.js';

// Create Element Group
export const createElementGroup = async (req, res) => {
    const { name, elementIds = [] } = req.body;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        // Create the element group
        const group = await ElementGroup.create({ name, userId });

        // Associate the specified elements with the group
        const elements = await Element.findAll({ where: { id: elementIds } });
        await group.addElements(elements);

        res.status(201).json({ group });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update Element Group
export const updateElementGroup = async (req, res) => {
    const { id } = req.params;
    const { name, elementIds = [] } = req.body;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const group = await ElementGroup.findOne({ where: { id, userId } });
        if (!group) return res.status(404).json({ message: 'Element group not found' });

        group.name = name || group.name;
        await group.save();

        // Update elements in the group
        if (elementIds.length > 0) {
            const elements = await Element.findAll({ where: { id: elementIds } });
            await group.setElements(elements); // Re-associate elements
        }

        res.status(200).json({ group });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete Element Group
export const deleteElementGroup = async (req, res) => {
    const { id } = req.params;
    // const userId = req.user.id; // Current user's ID

    // Testing ******************************************************
    const userId = req.body.userid; // Used for testing purposes ***
    // Testing ******************************************************

    try {
        const group = await ElementGroup.findOne({ where: { id, userId } });
        if (!group) return res.status(404).json({ message: 'Element group not found' });

        await group.destroy();
        res.status(200).json({ message: 'Element group deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
