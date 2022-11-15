const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = db.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profissao: {
        type: DataTypes.STRING,
        required: true
    },
    newsletter: {
        type: DataTypes.BOOLEAN,
    }
})

module.exports = User