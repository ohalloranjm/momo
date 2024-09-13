const { STATS } = require('../utils/constants');
const { ActionRowBulider, ButtonBuilder, ButtonStyle } = require('discord.js');
require('../utils/custom-methods');

const buttons = STATS.map(stat =>
  new ButtonBuilder().setCustomId(stat).setStyle(ButtonStyle.Primary)
);

const row = new ActionRowBulider().addComponents(buttons);

module.exports = [row];
