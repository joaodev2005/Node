const { Sequelize } = require('sequelize');

const sequelize  = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('Conectado com sucesso!');
} catch(error) {
    console.log(`Não foi possível conectar ao banco de dados: ${error}`);
}

module.exports = sequelize