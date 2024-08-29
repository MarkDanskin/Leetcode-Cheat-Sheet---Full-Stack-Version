import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';

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
        await sequelize.sync({ force: false });
        console.log('Database synced successfully');
    } catch (error) {
        console.log('Error syncing database', error);
    }
};

syncDatabase();

app.use('/auth', authRoutes);

export default app;
