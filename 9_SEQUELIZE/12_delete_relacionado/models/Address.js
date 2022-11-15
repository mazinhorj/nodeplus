const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Address = db.define('Address', {
    rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.STRING,
        required: true
    },
    cidade: {
        type: DataTypes.STRING,
        required: true
    }
})

User.hasMany(Address)
Address.belongsTo(User)

module.exports = Address