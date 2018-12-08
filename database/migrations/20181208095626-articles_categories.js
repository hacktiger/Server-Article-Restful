'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
      */
      return queryInterface.createTable('articles_categories', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
          validate: {
            isNumeric: true,
            isInt: true,
            notNull: true,
            notEmpty: true
          }
        },
        categoryid: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { // foreign key
            model: 'categories', // name of target model
            key: 'id' // key in the target model
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        articleid: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: { // foreign key
            model: 'articles', // name of target model
            key: 'id' // key in the target model
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      });
    },

    down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
      */
      return queryInterface.dropTable('articles_categories');
    }
  };
