# Server-Article-Restful

Purpose
- Practice with Node server side by:
+ Create restful api for a blog 
+ Use it to make simple website

'use strict';

const articles = sequelize.define('articles', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
      isNumeric: true,
      isInt: true,
      notNull: true,
      notEmpty: true
    }
  },
  title:{
    type: Sequelize.STRING, 
    allowNull: false
  },
  body: {
    type: Sequelize.STRING
  },
  author: {
    type: Sequelize.INTEGER  
  }
});

articles.sync({force: true})