import { GET_ALL_USER } from './query';

const pgp = require("pg-promise")();
const db = pgp(process.env.DATABASE_URL);

const handleGetUsers = (req, res) => {
  db.query(GET_ALL_USER)
    .then(data => {
      return res.status("200").json({
        code: "200",
        message: "Successfully get all users ",
        data: data
      });
    })
    .catch(error => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack
      });
    });
};

const handlePostUsers = (req, res) => {
  db.query("INSERT INTO users(email, password) values($1,$2)", [
    req.query.email,
    req.query.password
  ])
    .then(data => {
      return res
        .status("200")
        .json({ code: "200", message: "Successfully added user " });
    })
    .catch(error => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack
      });
    });
};

module.exports = {
  handleGetUsers,
  handlePostUsers
};