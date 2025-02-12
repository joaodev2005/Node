const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    newsLetter: {
        type: DataTypes.BOOLEAN,
    },
    occupation: {
        type: DataTypes.STRING,
        required: true
    },
}); 

module.exports = User

