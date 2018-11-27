'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        isInt: true,
        notNull: true,
        notEmpty: true
      }
    },
    body: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    userID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    articleID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
    comments.belongsTo(models.users)
    comments.belongsTo(models.articles)
z  };
  return comments;
};