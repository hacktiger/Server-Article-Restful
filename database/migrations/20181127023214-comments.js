'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.createTable('comments', {
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
      body: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      userID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // foreign key
          model: 'users', // name of target model
          key: 'id' // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      articleID: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { // foreign key
          model: 'articles', // name of target model
          key: 'id' // key in the target model
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
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
    return queryInterface.dropTable('comments');
  }
};
