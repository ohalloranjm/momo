'use strict';
require('dotenv').config();
const { PlayerCharacter } = require('../models');

const characters = [
  {
    userId: process.env.ADMIN_ID,
    active: true,
    name: 'Aang',
    playbook: 'Icon',
    Creativity: 2,
    Focus: 1,
    Harmony: 0,
    Passion: -1,
    balance: 1,
    Airbending: true,
  },
  {
    userId: process.env.ADMIN_ID,
    active: false,
    name: 'Katara',
    playbook: 'Idealist',
    Creativity: 0,
    Focus: -1,
    Harmony: 2,
    Passion: 1,
    balance: 0,
    Waterbending: true,
  },
  {
    userId: process.env.ADMIN_ID,
    active: false,
    name: 'Sokka',
    playbook: 'Bold',
    Creativity: 1,
    Focus: 2,
    Harmony: -1,
    Passion: 0,
    balance: 0,
    Weapons: true,
  },
  {
    userId: process.env.ADMIN_ID,
    active: false,
    name: 'Toph Bei Fong',
    playbook: 'Prodigy',
    Creativity: 0,
    Focus: 2,
    Harmony: -1,
    Passion: 1,
    balance: -1,
    Earthbending: true,
  },
  {
    userId: process.env.ADMIN_ID,
    active: false,
    name: 'Suki',
    playbook: 'Pillar',
    Creativity: 1,
    Focus: 1,
    Harmony: 1,
    Passion: -1,
    balance: 0,
    Weapons: true,
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await PlayerCharacter.bulkCreate(characters);
  },

  async down(queryInterface, Sequelize) {
    for (const char of characters) {
      const pc = await PlayerCharacter.findOne({
        where: {
          name: char.name,
          userId: process.env.ADMIN_ID,
        },
      });
      await pc.destroy();
    }
  },
};
