const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = require('./User');

const Tought = db.define('Tought', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true
    },
});

Tought.belongsTo(User)

User.hasMany(Tought)

module.exports = Tought