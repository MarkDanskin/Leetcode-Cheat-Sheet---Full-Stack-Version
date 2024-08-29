import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ActiveUser = sequelize.define('ActiveUser', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Starts at 1
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
});
