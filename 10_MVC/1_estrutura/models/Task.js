const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const Task = db.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
});

module.exports = Task