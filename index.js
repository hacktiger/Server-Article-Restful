const ENV = require("./configs/config");
const UserController = require("./controller/UserController")
const ArticleController = require("./controller/ArticleController")
const CommentController = require("./controller/CommentController")
//
const parser = require("body-parser");
const express = require("express");
const app = express();
// use
app.use(parser.json());

// NEED TO FIX :
/**
 *  [x] : fixed
 *  [o] : working on it
 *  [{anything else}] : {anything else}
 *  1. [x] get users if id not exist now return html doc for some reason but articles dont
 *  2. [done for some funcs] may need error.stack.error (so each log error is in a line)
 *  3. [x] add so that update params are only optional
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        Main methods for API                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.status("200").json({ code: "200", message: "Connection successful !" });
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/users')                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/users")
  .get((req, res) => UserController.handleGetUsers(req, res))
  .post((req, res) => UserController.handlePostUsers(req, res))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                     Route('/users/:userID')                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/users/:userID")
  .get((req, res) => UserController.getUserById(req, res))
  .put((req, res) => UserController.handlePutUserById(req, res))
  .delete((req, res) => UserController.handleDeleteUserById(req, res))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/articles')                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/articles")
  .get((req, res) => ArticleController.getArticles(req, res))
  .post((req, res) => ArticleController.postArticles(req, res))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Route('/articles/:articleID')                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/articles/:articleID")
  .get((req, res) => ArticleController.handleGetArticleById(req, res))
  .put((req, res) => ArticleController.handlePutArticleById(req, res))
  .delete((req, res) => ArticleController.handleDeleteArticleById(req, res))
/////////////////////////////////////////////////
// get all info from article by id
//////////////////////////////////////////////////
app.get('/articles/:articleID/info', (req, res) => ArticleController.getAllArticleInfoById(req, res));
/////////////////////////////////////////////////
// get articles pagination
//////////////////////////////////////////////////
app.get('/articles/page/:pageNo', (req, res) => ArticleController.getArticlesByPage(req, res));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/categories')                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/categories")
  .get((req, res) => {
    getCategories(req, res);
  })
  .post((req, res) => {
    postCategories(req, res);
  })
getCategories = (req, res) => {
  db.query("SELECT * FROM categories")
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
postCategories = (req, res) => {
  db.query("INSERT INTO categories(name) values($1)", [ req.query.name ])
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
////////////
app.route("/categories/:categoryID")
	.get((req, res) => {
		getCategoriesById(req, res);
	})

getCategoriesById = (req, res) => {
	db.query("SELECT * FROM categories WHERE id = $1", req.params.categoryID)
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
///// get all cat of an article
app.route("/categories/article/:articlesID")
  .get((req, res) => {
    getCategoriesByArticleId(req, res);
  })
  <!-- TODO: something is wrong here there is no parameter $1-->
getCategoriesByArticleId = (req, res) => {
  db.query("SELECT categories.name FROM articles_categories LEFT JOIN categories ON  articles_categories.id = categories.id WHERE articles_categories.articleid = $1", req.params.articlesID)
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
///// get all article with a category
app.route("/articles/categories/:categoryID")
  .get((req, res) => {
    getCategoriesByArticleId(req, res);
  })
getCategoriesByArticleId = (req, res) => {
  db.query(" SELECT articles.title, articles.body, articles.userid, articles.createdat, articles.updatedat FROM articles_categories LEFT JOIN articles ON  articles_categories.id = articles.id WHERE articles_categories.categoryid = $1 ", req.params.categoryID)
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/comments')                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.route("/comments")
  .get((req, res) => CommentController.getComments(req, res))
  .post((req, res) => CommentController.postComments(req, res))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Route('/comments/:commentID')                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
app.route("/comments/:commentID")
  .get((req, res) => CommentController.getCommentById(req, res))
  .put((req, res) => CommentController.putCommentById(req, res))
  .delete((req, res) => CommentController.deleteCommentById(req, res))
/////////////////////////////////////////// Get all comments by userID
app.route('/comments/users/:userID')
  .get((req, res) => {
    getCommentByUserId(req, res);
  })
app.route('/comments/articles/:articleID')
  .get((req, res) => {
    getCommentByArticleId(req, res);
  })
// Helper functions
getCommentByUserId = (req, res) => {
  db.query('SELECT * FROM comments WHERE userid = $1', req.params.userID)
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
getCommentByArticleId = (req, res) => {
  db.query('SELECT comments.id, comments.body, comments.createdat, users.email FROM comments LEFT JOIN users ON comments.userid = users.id WHERE comments.articleid = $1', req.params.articleID)
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
// Ports no
app.listen(process.env.PORT || ENV.PORT, () =>
  console.log(`Example app on port ${ENV.PORT}`)
);
