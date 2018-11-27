'use strict';
module.exports = (sequelize, DataTypes) => {
  const articles = sequelize.define('articles', {
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
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  articles.associate = function(models) {
    // associations can be defined here
    articles.belongsTo(models.users)
z  };
  return articles;
};