const query = require('./query')
const config = require('../configs/config')
const db = config.db

const getCategories = (req, res) => {
  db.query(query.GET_ALL_CATEGORY)
    .then((data) => {
      return res.status("200").json({
        code: "200",
        message: "Successfully get all categories ",
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
}
const postCategories = (req, res) => {
  db.query(query.POST_CATEGORY, [ req.query.name ])
    .then(data => {
      return res
        .status("200")
        .json({ code: "200", message: "Successfully added categories " });
    })
    .catch(error => {
      return res.status("401").json({
        name: error.name,
        query: error.query,
        message: error.message,
        stack: error.stack.error
      });
    });  
}
const getCategoriesById = (req, res) => {
	db.query(query.GET_CATEGORY_BY_ID, req.params.categoryID)
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
}
const getCategoriesByArticleId = (req, res) => {
  db.query(query.GET_CATEGORY_BY_ARTICLE_ID, req.params.articlesID)
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
const getArticlesByCategoryId = (req, res) => {
  db.query(query.GET_ARTICLE_BY_CATEGORY_ID, req.params.categoryID)
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
  getCategories,
  postCategories,
  getCategoriesById,
  getCategoriesByArticleId,
  getArticlesByCategoryId
};