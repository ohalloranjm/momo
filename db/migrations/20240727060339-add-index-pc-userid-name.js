'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('PlayerCharacters', [
      'userId',
      'name'
    ], {
      unique: true
    })
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeIndex('PlayerCharacters', [
      'userId',
      'name'
    ])
  }
};
