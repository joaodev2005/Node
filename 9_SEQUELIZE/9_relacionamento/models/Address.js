const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const user = require('./User');

const Address = db.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
});

Address.belongsTo(user);

module.exports = Address