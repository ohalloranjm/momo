'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PcTechniques', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pcId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PlayerCharacters'
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      techniqueId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Techniques'
        },
        onDelete: 'cascade',
        allowNull: false,
      },
      level: {
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
    await queryInterface.dropTable('PcTechniques');
  }
};