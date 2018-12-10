const query = require('./query')
const config = require('../configs/config')
const db = config.db

const getArticles = (req, res) => {
  db.query(query.GET_ALL_ARTICLE)
    .then(data => {
      return res.status("200").json({
        code: "200",
        message: "Successfully get all articles",
        data: data
      });
    })
    .catch(error => {
      return res.status("401").json({name: error.name,query: error.query,message: error.message,stack: error.stack});
    });
};
const postArticles = (req, res) => {
  db.query(query.POST_ARTICLE, [ req.query.title,req.query.body,req.query.userid ])
    .then(data => {
      return res.status("200").json({ code: "200", data:data, message: "Successfully added article " });
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

const handleGetArticleById = (req, res) => {
  db.query(query.GET_ARTICLE_BY_ID, req.params.articleID)
    .then((data) => {
      return res.status("200").json({ code: "200", message: "Success", data: data });
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
const handlePutArticleById = (req, res) => {
  db.query(query.PUT_ARTICLE_BY_ID, [ req.query.body,req.params.articleID ])
    .then((data) => {
      return res.status("200").json({code: "200", data: data, message: `Successfully updated article ${req.params.articleID}`});
    })
    .catch(error => {
      return res.status("401").json({name: error.name,query: error.query,message: error.message,stack: error.stack});
    });
};
const handleDeleteArticleById = (req, res) => {
  db.query(query.DELETE_ARTICLE_BY_ID, req.params.articleID)
    .then(data => {
      return res.status("200").json({
        code: "200",
        message: `Successfully delete article`
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
//////////////////////////////
const getAllArticleInfoById = (req, res) => {
  db.query(query.GET_ARTICLE_INFO_BY_ID, req.params.articleID)
    .then(data => {
      return res.status("200").json({
        code: "200",
        message: "Successfully get all articles",
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
}

const getArticlesByPage = (req, res) => {
  let offset = (req.params.pageNo - 1) * 5
  db.query(query.GET_ARTICLE_BY_PAGE, offset)
    .then(data => {
      return res.status("200").json({
        code: "200",
        message: "Successfully get all articles",
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
}

module.exports = {
  getArticles,
  postArticles,
  handleGetArticleById,
  handlePutArticleById,
  handleDeleteArticleById,
  getAllArticleInfoById,
  getArticlesByPage
};