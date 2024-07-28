'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayerCharacters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
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
      creativity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      focus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      harmony: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      passion: {
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
      waterbending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      earthbending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      firebending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      airbending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      weapons: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      technology: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
      conditionA: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      conditionB: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      conditionC: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      conditionD: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      conditionE: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      empowered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      favored: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      inspired: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      prepared: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      doomed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      impaired: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      trapped: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stunned: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      growth: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false,
      },
      advanceMoveOwn: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advanceMoveOther: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advanceCenter: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advanceMomentBalance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advanceCreativity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advanceFocus: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advanceHarmony: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      advancePassion: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('PlayerCharacters');
  }
};