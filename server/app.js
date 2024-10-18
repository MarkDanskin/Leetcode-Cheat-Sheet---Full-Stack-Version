import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import './models/Relationships.js';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';

import accountRoutes from './routes/accountRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import elementRoutes from './routes/elementRoutes.js';
import snippetRoutes from './routes/snippetRoutes.js';
import elementGroupRoutes from './routes/elementGroupRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(
    session({
        secret: 'your-session-secret',
        resave: false,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

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

app.use('/api/account', accountRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/elements', elementRoutes);
app.use('/api/snippets', snippetRoutes);
app.use('/api/elementGroup', elementGroupRoutes);
app.use('/auth', authRoutes);

export default app;
