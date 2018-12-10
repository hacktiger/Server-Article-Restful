const query = require('./query')
const config = require('../configs/config')
const db = config.db

const getComments =(req, res) => {
  db.query(query.GET_ALL_COMMENT)
    .then((data) => {
      return res.status("200").json({
        code: "200",
        message: "Successfully get all comments ",
        data: data
      });
    })
    .catch(error => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack.error
      });
    });
};
const postComments = (req, res) => {
  db.query(query.POST_COMMENT, [ req.query.body, req.query.userid, req.query.articleid ])
    .then(data => {
      return res
        .status("200")
        .json({ code: "200", message: "Successfully added comment " });
    })
    .catch(error => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack.error
      });
    });
};
const getCommentById = (req, res) => {
  db.query(query.GET_COMMENT_BY_ID, req.params.commentID)
    .then(function(data) {
      return res.status("200").json({ code: "200", message: "Success", data: data });
    })
    .catch(function(error) {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack.error
      });
    });
};
const putCommentById = (req, res) => {
  db.query(query.GET_COMMENT_BY_ID, req.params.commentID)
    .then((data) => {
      const userid = (req.query.userid == null)? data[0].userid: req.query.userid;
      const articleid = (req.query.articleid == null)? data[0].articleid: req.query.articleid ;
      const body = (req.query.body == null)? data[0].body: req.query.body ;

      return {
        userid: userid,
        articleid: articleid,
        body: body,
        commentID: req.params.commentID
      }
    })
    .then((obj) => {
      return db.query(query.PUT_COMMENT_BY_ID, [ obj.body, obj.userid, obj.articleid, obj.commentID])
        .then(() => {
          return res.status("200").json({
            code: "200",
            message: `Successfully updated comment`
          });
        })
        .catch((err) => {
          return res.status("401").json({name: error.name,query: error.query,message: error.message,stack: error.stack.error});          
        })
    })
    .catch((err) => {
      return res.status("401").json({name: error.name,query: error.query,message: error.message,stack: error.stack.error});          
    })
};
const deleteCommentById = (req, res) => {
  db.query(query.DELETE_COMMENT_BY_ID, req.params.commentID)
    .then(data => {
      return res.status("200").json({
        code: "200",
        message: `Successfully delete comment`
      });
    })
    .catch(error => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack.error
      });
    });
};
const getCommentByUserId = (req, res) => {
  db.query(query.GET_COMMENT_BY_USER_ID, req.params.userID)
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
        stack: error.stack.error
      });
    });
};
const getCommentByArticleId = (req, res) => {
  db.query(query.GET_COMMENT_BY_ARTICLE_ID, req.params.articleID)
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
        stack: error.stack.error
      });
    });
};
module.exports = {
  getComments,
  postComments,
  getCommentById,
  putCommentById,
  deleteCommentById,
  getCommentByUserId,
  getCommentByArticleId
};