// controllers
const UserController = require("./controller/UserController")
const ArticleController = require("./controller/ArticleController")
const CommentController = require("./controller/CommentController")
const CategoryController = require("./controller/CategoryController")
// others
const ENV = require("./configs/config");
const parser = require("body-parser");
const express = require("express");
const app = express();
// use
app.use(parser.json());
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
  .get((req, res) => CategoryController.getCategories(req, res))
  .post((req, res) => CategoryController.postCategories(req, res))
////////////
app.get("/categories/:categoryID", (req, res) => CategoryController.getCategoriesById(req, res))
///// get all cat of an article
app.get("/categories/article/:articlesID", (req, res) => CategoryController.getCategoriesByArticleId(req, res))
///// get all article with a category
app.get("/articles/categories/:categoryID", (req, res) => CategoryController.getArticlesByCategoryId(req, res))
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
app.get('/comments/users/:userID', (req, res) => CommentController.getCommentByUserId(req, res))
app.get('/comments/articles/:articleID', (req, res) => CommentController.getCommentByArticleId(req, res))
// Helper functions

// Ports no
app.listen(process.env.PORT || ENV.PORT, () =>
  console.log(`Example app on port ${ENV.PORT}`)
);
