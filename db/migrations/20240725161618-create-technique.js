'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Techniques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      approach: {
        type: Sequelize.STRING,
        allowNull: false
      },
      training: {
        type: Sequelize.STRING
      },
      effect: {
        type: Sequelize.BLOB
      },
      rare: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      special: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Techniques');
  }
};