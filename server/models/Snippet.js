import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Snippet = sequelize.define(
    'Snippet',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        code: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        output: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    { timestamps: true }
);

export default Snippet;
