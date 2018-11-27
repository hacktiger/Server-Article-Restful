const ENV = require('./configs/config');
//
const parser = require('body-parser');
const express = require('express');
const app = express();
const db = ENV.DB;
//
app.use(parser.json());
//
app.get('/', (req,res) => res.send(' Connection successful !'));
// get user info with ID
app.get('/users/:userID', (req,res) => {
  db.one('SELECT * from users WHERE id = $1', req.params.userID)
  .then(function (data) {
    return res.status('200').json(data)
  })
  .catch(function (error) {
    return res.status('401').json({code:501, message:'something went wrong',error: error})
  })
});

app.listen(ENV.PORT, () => console.log(`Example app on port ${ENV.PORT}`))
