import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import './models/Relationships.js';

import accountRoutes from './routes/accountRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import elementRoutes from './routes/elementRoutes.js';
import snippetRoutes from './routes/snippetRoutes.js';
import elementGroupRoutes from './routes/elementGroupRoutes.js';

// Determine __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//processes any incoming request that contains a JSON body and makes the parsed data available in req.body
app.use(express.json());
// Used to parse data from submitted HTML forms and add to req.body
app.use(express.urlencoded({ extended: false }));

app.get('/test-db', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.send('Database connection successful');
    } catch (error) {
        res.status(500).send('Error connecting to database');
    }
});

const syncDatabase = async () => {
    try {
        // await sequelize.getQueryInterface().dropTable('ElementGroupElement');
        // await sequelize.getQueryInterface().dropTable('ElementCategory');
        // await sequelize.getQueryInterface().dropTable('Logs');
        // await sequelize.getQueryInterface().dropTable('Users');

        await sequelize.sync({ force: false });
        console.log('Database synced successfully');
    } catch (error) {
        console.log('Error syncing database', error);
    }
};

syncDatabase();

app.use('/account', accountRoutes);
app.use('/categories', categoryRoutes);
app.use('/elements', elementRoutes);
app.use('/snippets', snippetRoutes);
app.use('/elementGroup', elementGroupRoutes);

export default app;
