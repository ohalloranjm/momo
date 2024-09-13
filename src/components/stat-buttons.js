const { STATS } = require('../utils/constants');
const { ActionRowBulider, ButtonBuilder, ButtonStyle } = require('discord.js');
require('../utils/custom-methods');

const buttons = STATS.map(stat =>
  new ButtonBuilder().setCustomId(stat).setStyle(ButtonStyle.Primary)
);

module.exports = [buttons];
