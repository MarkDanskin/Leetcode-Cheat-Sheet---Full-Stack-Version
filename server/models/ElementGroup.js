import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ElementGroup = sequelize.define('ElementGroup', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true, // Starts at 1
        unique: true,
        primaryKey: true,
        allowNull: false,
    },
});
