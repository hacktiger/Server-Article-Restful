const GET_ALL_USER = "SELECT * FROM users"
const POST_USER = "INSERT INTO users(email, password) values($1,$2)"
const GET_USER_BY_ID = "SELECT * from users WHERE id = $1"
const PUT_USER_BY_ID = "UPDATE users SET email=$1 WHERE id=$2 "
const DELETE_USER_BY_ID = "DELETE FROM users WHERE id = $1"
//
const GET_ALL_ARTICLE = "SELECT * FROM articles"
const POST_ARTICLE = "INSERT INTO articles(title, body, userid) values($1, $2, $3)"
const GET_ARTICLE_BY_ID = "SELECT * from articles WHERE id = $1"
const PUT_ARTICLE_BY_ID = "UPDATE articles SET body=$1 WHERE id=$2 "
const DELETE_ARTICLE_BY_ID = "DELETE FROM articles WHERE id = $1"

const GET_ARTICLE_INFO_BY_ID = "SELECT articles.id, articles.title, articles.body, articles.createdat, articles.updatedat, users.email FROM articles LEFT JOIN users ON articles.userid = users.id WHERE articles.id = $1"
const GET_ARTICLE_BY_PAGE = "SELECT articles.id, articles.title, articles.body, articles.createdat, articles.updatedat, users.email FROM articles LEFT JOIN users ON articles.userid = users.id ORDER BY articles.id OFFSET $1 LIMIT 6"

const GET_ALL_COMMENT = "SELECT * FROM comments"
const POST_COMMENT = "INSERT INTO comments(body, userid, articleid ) values($1,$2,$3)"
const PUT_COMMENT_BY_ID = "UPDATE comments SET body=$1,userid=$2,articleid=$3 WHERE id=$4 "
const GET_COMMENT_BY_ID = "SELECT * from comments WHERE id = $1"
const DELETE_COMMENT_BY_ID = "DELETE FROM comments WHERE id = $1"
// EXPORTS
module.exports = {
  GET_ALL_USER, POST_USER, GET_USER_BY_ID, PUT_USER_BY_ID, DELETE_USER_BY_ID,
  GET_ALL_ARTICLE, POST_ARTICLE, GET_ARTICLE_BY_ID, PUT_ARTICLE_BY_ID, DELETE_ARTICLE_BY_ID,
  GET_ARTICLE_INFO_BY_ID, GET_ARTICLE_BY_PAGE,
  GET_ALL_COMMENT, POST_COMMENT, GET_COMMENT_BY_ID, PUT_COMMENT_BY_ID, DELETE_COMMENT_BY_ID
};