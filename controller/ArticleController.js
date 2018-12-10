
const query = require('./query')
const config = require('../configs/config')
const db = config.db



module.exports = {
  handleGetUsers,
  handlePostUsers,
  getUserById,
  handlePutUserById,
  handleDeleteUserById
};