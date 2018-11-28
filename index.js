const ENV = require('./configs/config');
//
const parser = require('body-parser');
const express = require('express');
const app = express();
// const db = ENV.DB;
// DB stuff
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});
const client = pool.connect()
app.get('/db', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM users');
    const results = (result) ? result.rows : null;
    res.send(results)
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
})
// parser
app.use(parser.json());
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                        Main methods for API                                            //
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req,res) => res.send(' Connection successful !'));
// get user info with ID
app.get('/users', (req, res) => {
  client.query('SELECT * FROM users')
    .then((data) => {
      return res.status('200').json(data,rows)
    })
    .catch(function (error) {
      return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
    })
});
// get user by id
app.get('/users/:userID', (req,res) => {
  client.query('SELECT * from users WHERE id = $1', req.params.userID)
  .then(function (data) {
    return res.status('200').json(data)
  })
  .catch(function (error) {
    return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
  })
});
//
app.post('/users', (req, res) => {
  client.query('INSERT INTO users(email, password) values($1,$2)', [req.query.email, req.query.password])
    .then((data) => {
      return res.status('200').json({ code: '200', message: 'Successfully added user ', data: data });
    })
    .catch((error) => {
      return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
    })
});
//
app.put('/users/:userID', (req,res) => {
  client.query('UPDATE users SET email=$1 WHERE id=$2 ', ['chagned@gmail.com', req.params.userID])
    .then(() => {
      return res.status('200').json({ code: '200', message: `Successfully updated user ${req.params.userID}` });
    })
    .catch((error) => {
      return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
    })
});
// 
app.delete('/users/:userID', (req,res) => {
  client.query('DELETE FROM users WHERE id = $1', req.params.userID)
  .then(() => {
    return res.status('200').json({ code: '200', message: `Successfully delete user with userID = ${req.params.userID}` })
  })
  .catch((error) => {
    return res.status('401').json({ name:error.name, query:error.query, message:error.message,stack:error.stack })
  })
});
// Ports no
app.listen(process.env.PORT || ENV.PORT, () => console.log(`Example app on port ${ENV.PORT}`))

