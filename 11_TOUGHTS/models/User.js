const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
});

module.exports = User