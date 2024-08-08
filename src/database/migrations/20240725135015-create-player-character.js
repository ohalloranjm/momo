'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayerCharacters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      playbook: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Creativity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Focus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Harmony: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Passion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      center: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Waterbending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Earthbending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Firebending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Airbending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Weapons: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Technology: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      backgrounds: {
        type: Sequelize.STRING,
      },
      demeanor: {
        type: Sequelize.STRING,
      },
      fatigue: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      conditions: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '00000',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlayerCharacters');
  },
};
