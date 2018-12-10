const pgp = require("pg-promise")();
const db = pgp(process.env.DATABASE_URL);

const PORT = 5000;


module.exports = {
  PORT,
  db
};