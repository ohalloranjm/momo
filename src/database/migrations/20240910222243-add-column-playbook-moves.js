'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('PlayerCharacters', 'moves', {
      type: Sequelize.STRING(500),
      allowNull: false,
      defaultValue: '',
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.removeColumn('PlayerCharacters', 'moves');
  },
};
