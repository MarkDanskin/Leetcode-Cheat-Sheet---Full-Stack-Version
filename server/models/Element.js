import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Element = sequelize.define(
    'Element',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Starts at 1
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        description: { type: DataTypes.TEXT, allowNull: false },
        language: { type: DataTypes.STRING, allowNull: false },
    },
    { timestamps: true }
);
