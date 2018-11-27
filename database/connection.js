const Sequelize = require('sequelize');
const connection = new Sequelize('postgres', 'lam', '123', {
  host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
})

module.exports = {
  connection:connection,
  sequelize: Sequelize
}


// Or you can simply use a connection uri
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');