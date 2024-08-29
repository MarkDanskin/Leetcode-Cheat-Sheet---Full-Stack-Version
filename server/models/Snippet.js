import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Snippet = sequelize.define('Snippet', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Starts at 1
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    code: {},
    output: {},
});
