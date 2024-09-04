import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, // Starts at 1
            unique: true,
            primaryKey: true,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'User',
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [1, 255], // Email Length Limit
            },
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [2, 20], // Username Length Limit
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[\x21-\x7E]+$/, // Regular expression to include only characters within the ASCII range 33 (!) to 126 (~)
                    msg: 'Username can only contain letters, numbers, and basic symbols',
                },
                len: [8, 255], // Password Length Limit
            },
        },
    },
    {
        timestamps: true,
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 10);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 10);
                }
            },
        },
    }
);

export default User;
