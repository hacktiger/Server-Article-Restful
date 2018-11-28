const ENV = require('./configs/config');
//
const parser = require('body-parser');
const express = require('express');
const app = express();
//
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL)
// use
app.use(parser.json());

////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        Main methods for API                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req,res) => {
  res.status('200').json({ code: '200', message: 'Connection successful !'})
});
// Route /users/userID
app.route('/users/:userID')
  .get((req, res) => {
    db.query('SELECT * from users WHERE id = $1', req.params.userID)
      .then(function (data) {
        if (data.length === 0){
          return res.status('201').json({ message: `Cannot find user with id = ${userID}` })
        }
        return res.status('200').json({ code: '200', message: 'Success', data: data })
      })
      .catch(function (error) {
        return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
      })
  })
  .put((req,res) => {
    db.query('UPDATE users SET email=$1 WHERE id=$2 ', ['chagned@gmail.com', req.params.userID])
      .then(() => {
        return res.status('200').json({ code: '200', message: `Successfully updated user ${req.params.userID}` });
      })
      .catch((error) => {
        return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
      })   
  })
  .delete((req,res) => {
    db.query('DELETE FROM users WHERE id = $1', req.params.userID)
      .then((data) => {
        return res.status('200').json({ code: '200', message: `Successfully delete user with userID = ${req.params.userID}` })
      })
      .catch((error) => {
        return res.status('401').json({ name:error.name, query:error.query, message:error.message, stack:error.stack })
      })
  })


////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/users')                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route /users
app.route('/users')
  .get((req,res) => {
    handleGetUsers(req, res)
  })
  .post((req,res) => {
    handlePostUsers(req, res)
  })
// Helper functions
handleGetUsers = (req, res) => {
  return db.query('SELECT * FROM users')
          .then((data) => {
            return res.status('200').json({ code: '200', message: 'Successfully get all users ', data: data });
          })
          .catch((error) => {
            return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
          })    
};
handlePostUsers = (req,res) => {
  return db.query('INSERT INTO users(email, password) values($1,$2)', [req.query.email, req.query.password])
          .then((data) => {
            return res.status('200').json({ code: '200', message: 'Successfully added user ', data: data });
          })
          .catch((error) => {
            return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
          })  
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                      Route('/articles')                                                   //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
app.route('/articles')
  .get((req,res) => {
    handleGetArticles(req, res)
  })
  .post((req,res) => {
    handlePostArticles(req, res)
  })
// Helper functions
handleGetArticles = (req, res) => {
  return db.query('SELECT * FROM articles')
          .then((data) => {
            return res.status('200').json({ code: '200', message: 'Successfully get all articles', data: data });
          })
          .catch((error) => {
            return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
          })    
};
handlePostArticles = (req,res) => {
  return db.query('INSERT INTO articles(body, userID) values($1,$2)', [req.query.body, req.query.userID])
          .then((data) => {
            return res.status('200').json({ code: '200', message: 'Successfully added article ', data: data });
          })
          .catch((error) => {
            return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
          })  
}


// Ports no
app.listen(process.env.PORT || ENV.PORT, () => console.log(`Example app on port ${ENV.PORT}`))
