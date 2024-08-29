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
            validate: { isEmail: true },
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [2, 32],
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: /^[a-zA-Z0-9!@#$%^&*()]+$/, // Regular expression to include letters, numbers, and symbols
                    msg: 'Username can only contain letters, numbers, and the special characters !@#$%^&*()',
                },
                len: [8, 128],
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
                    bcrypt.hash(user.password, 10);
                }
            },
        },
    }
);

export default User;
