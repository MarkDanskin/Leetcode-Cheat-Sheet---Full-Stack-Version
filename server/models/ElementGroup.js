import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ElementGroup = sequelize.define(
    'ElementGroup',
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
    },
    { timestamps: true }
);

export default ElementGroup;
