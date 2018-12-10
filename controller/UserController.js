
const query = require('./query')
const config = require('../configs/config')
const db = config.db

const handleGetUsers = (req, res) => {
  db.query(query.GET_ALL_USER)
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
  db.query( query.POST_USER, [req.query.email,req.query.password] )
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

const getUserById = (req, res) => {
  // console.log(req.params.userID)
  db.query( query.GET_USER_BY_ID , req.params.userID)
    .then(function(data) {
      return res
        .status("200")
        .json({ code: "200", message: "Success", data: data });
    })
    .catch(function(error) {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack
      });
    });
};

const handlePutUserById = (req, res) => {
  db.query( query.PUT_USER_BY_ID, [ req.query.email,req.params.userID ])
    .then(() => {
      return res.status("200").json({
        code: "200",
        message: `Successfully updated user ${req.params.userID}`
      });
    })
    .catch((error) => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack
      });
    });
};

const handleDeleteUserById = (req, res) => {
  db.query( query.DELETE_USER_BY_ID, req.params.userID)
    .then((data) => {
      return res.status("200").json({
        code: "200",
        message: `Successfully delete user`
      });
    })
    .catch((error) => {
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
  handlePostUsers,
  getUserById,
  handlePutUserById,
  handleDeleteUserById
};