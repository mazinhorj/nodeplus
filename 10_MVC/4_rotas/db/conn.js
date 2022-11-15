const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

try {
    sequelize.authenticate()
    console.log(`Conectado com sucesso!`)
} catch (error) {
    console.log(`Conexão falhou: ${error}`)
}

module.exports = sequelize