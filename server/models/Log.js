import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Log = sequelize.define(
    'Log',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Starts at 1
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        ipAddress: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        success: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        details: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    { timestamps: true }
);

export default Log;
