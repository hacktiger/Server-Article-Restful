const GET_ALL_USER = "SELECT * FROM users"
const POST_USER = "INSERT INTO users(email, password) values($1,$2)"
const GET_USER_BY_ID = "SELECT * from users WHERE id = $1"
const PUT_USER_BY_ID = "UPDATE users SET email=$1 WHERE id=$2 "
const DELETE_USER_BY_ID = "DELETE FROM users WHERE id = $1"





module.exports = {
  GET_ALL_USER,
  POST_USER,
  GET_USER_BY_ID,
  PUT_USER_BY_ID,
  DELETE_USER_BY_ID
};