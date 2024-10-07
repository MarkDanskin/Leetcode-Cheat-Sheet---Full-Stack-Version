import sequelize from '../config/database.js';
import User from '../models/User.js';
import Element from '../models/element.js';
import Snippet from '../models/Snippet.js';
import Category from '../models/Category.js';
import ElementGroup from '../models/ElementGroup.js'; // Added import for ElementGroup
import '../models/Relationships.js';

// Create data by running node scripts/sampleData.js in the server directory

// Function to create sample data
const createSampleData = async () => {
    try {
        await sequelize.sync({ force: true }); // Clears the database and syncs the models

        // Create Categories
        const categories = [];
        for (let i = 1; i <= 10; i++) {
            categories.push(await Category.create({ name: `Category ${i}` }));
        }

        // Create Users
        const users = [];
        for (let i = 1; i <= 5; i++) {
            users.push(
                await User.create({
                    username: `User${i}`,
                    email: `user${i}@example.com`,
                    password: `Password123!`,
                })
            );
        }

        // Create Elements
        const elements = [];
        for (let i = 1; i <= 20; i++) {
            // Randomly select a user for the element
            const randomUser = users[Math.floor(Math.random() * users.length)];

            const element = await Element.create({
                name: `Element ${i}`,
                description: `Description for Element ${i}`,
                userId: randomUser.id, // Associate element with a user
            });
            elements.push(element);

            // Randomly associate categories
            const randomCategories = categories.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * categories.length) + 1); // Ensure at least one category
            await element.setCategories(randomCategories);

            // Create Snippets for each element
            const snippetsCount = Math.floor(Math.random() * 5) + 1; // 1 to 5 snippets per element
            for (let j = 0; j < snippetsCount; j++) {
                await Snippet.create({
                    name: `Snippet ${j + 1} for ${element.name}`,
                    description: `This is a snippet related to ${element.name}.`,
                    code: `console.log('Hello from ${element.name} Snippet ${j + 1}');`,
                    output: `Hello from ${element.name} Snippet ${j + 1}`,
                    elementId: element.id,
                    userId: randomUser.id, // Associate snippet with the same user as the element
                });
            }
        }

        // Create Element Groups (optional, if needed)
        for (let i = 1; i <= 5; i++) {
            const elementGroup = await ElementGroup.create({
                name: `Group ${i}`,
                userId: users[i - 1].id, // Associate group with a user
            });

            // Randomly associate elements with the group
            const randomElements = elements.sort(() => 0.5 - Math.random()).slice(0, Math.floor((Math.random() * elements.length) / 2) + 1); // At least one element
            await elementGroup.addElements(randomElements);
        }

        console.log('Sample data created successfully!');
    } catch (error) {
        console.error('Error creating sample data:', error);
    } finally {
        await sequelize.close(); // Close the database connection
    }
};

// Run the sample data creation function
createSampleData();
