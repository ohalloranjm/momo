const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { TRAININGS } = require('../utils/constants');

const buttons = TRAININGS.map(training =>
  new ButtonBuilder()
    .setCustomId(training)
    .setLabel(training)
    .setStyle(ButtonStyle.Primary)
);

const row1 = new ActionRowBuilder().addComponents(buttons.slice(0, 3));
const row2 = new ActionRowBuilder().addComponents(buttons.slice(3));

module.exports = [row1, row2];
