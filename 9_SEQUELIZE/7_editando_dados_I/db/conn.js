const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    'nodesequelize',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
)

// try {
//     sequelize.authenticate()
//     console.log('Conectado com sucesso! Valeu, sequelize...')
// } catch(err) {
//     console.log('Conexão não efetuada: ', error)
// }

module.exports = sequelize