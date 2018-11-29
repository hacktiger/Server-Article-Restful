const ENV = require("./configs/config");
//
const parser = require("body-parser");
const express = require("express");
const app = express();
//
const pgp = require("pg-promise")();
const db = pgp(process.env.DATABASE_URL);
// use
app.use(parser.json());

// NEED TO FIX :
/**
 *  1. get users if id not exist now return html doc for some reason but articles dont
 *  2. may need error.stack.error (so each log error is in a line)
 *  3. add so that update params are only optional
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
// Route /users
app.route("/users")
  .get((req, res) => {
    handleGetUsers(req, res);
  })
  .post((req, res) => {
    handlePostUsers(req, res);
  });
// Helper functions
handleGetUsers = (req, res) => {
  db.query("SELECT * FROM users")
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
handlePostUsers = (req, res) => {
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                     Route('/users/:userID')                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route /users/userID
app.route("/users/:userID")
  .get((req, res) => {
    getUserById(req, res);
  })
  .put((req, res) => {
    handlePutUserById(req, res);
  })
  .delete((req, res) => {
    handleDeleteUserById(req, res);
  });
// Helper functions
getUserById = (req, res) => {
  // console.log(req.params.userID)
  db.query("SELECT * from users WHERE id = $1", req.params.userID)
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
handlePutUserById = (req, res) => {
  db.query("UPDATE users SET email=$1 WHERE id=$2 ", [ req.query.email,req.params.userID ])
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
handleDeleteUserById = (req, res) => {
  db.query("DELETE FROM users WHERE id = $1", req.params.userID)
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/articles')                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
app.route("/articles")
  .get((req, res) => {
    handleGetArticles(req, res);
  })
  .post((req, res) => {
    handlePostArticles(req, res);
  });
// Helper functions
handleGetArticles = (req, res) => {
  db.query("SELECT * FROM articles")
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
};
handlePostArticles = (req, res) => {
  db.query("INSERT INTO articles(body, userid) values($1,$2)", [
    req.query.body,
    req.query.userid
  ])
    .then(data => {
      return res
        .status("200")
        .json({ code: "200", message: "Successfully added article " });
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Route('/articles/:articleID')                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
app.route("/articles/:articleID")
  .get((req, res) => {
    handleGetArticleById(req, res);
  })
  .put((req, res) => {
    handlePutArticleById(req, res);
  })
  .delete((req, res) => {
    handleDeleteArticleById(req, res);
  });
// Helper functions
handleGetArticleById = (req, res) => {
  db.query("SELECT * from articles WHERE id = $1", req.params.articleID)
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
handlePutArticleById = (req, res) => {
  db.query("UPDATE articles SET body=$1 WHERE id=$2 ", [ req.query.body,req.params.articleID ])
    .then(() => {
      return res.status("200").json({
        code: "200",
        message: `Successfully updated article ${req.params.articleID}`
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
handleDeleteArticleById = (req, res) => {
  db.query("DELETE FROM articles WHERE id = $1", req.params.articleID)
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/comments')                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
app.route("/comments")
  .get((req, res) => {
    getComments(req, res);
  })
  .post((req, res) => {
    postComments(req, res);
  });
getComments =(req, res) => {
  db.query("SELECT * FROM comments")
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
postComments = (req, res) => {
  db.query("INSERT INTO comments(body, userid, articleid ) values($1,$2,$3)", [ req.query.body, req.query.userid, req.query.articleid ])
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                  Route('/comments/:commentID')                                         //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
app.route("/comments/:commentID")
  .get((req, res) => {
    getCommentById(req, res);
  })
  .put((req, res) => {
    putCommentById(req, res);
  })
  .delete((req, res) => {
    deleteCommentById(req, res);
  });
// Helper functions
getCommentById = (req, res) => {
  db.query("SELECT * from comments WHERE id = $1", req.params.commentID)
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
putCommentById = (req, res) => {
  db.query("UPDATE comments SET body=$1 WHERE id=$2 ", [ req.query.body,req.params.commentID ])
    .then(() => {
      const isNull = (req.query.userid == null)? true : false
      const isNull2 = (req.query.body != null)? true : false

      return res.status("200").json({
        code: "200",
        message: `Successfully updated article ${req.params.commentID}`,
        isUserIdNull: isNull,
        aaa: isNull2
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
handleDeleteArticleById = (req, res) => {
  db.query("DELETE FROM comments WHERE id = $1", req.params.commentID)
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
  db.query('SELECT * FROM comments WHERE articleID = $1', req.params.articleID)
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
