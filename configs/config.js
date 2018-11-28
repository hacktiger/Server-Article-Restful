const pgp = require('pg-promise')();


const PORT = 5000;
// const DB = pgp('postgres://postgres:123@localhost:5432/postgres')


module.exports = {
  PORT,
  DB
};