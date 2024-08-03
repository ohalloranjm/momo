const { PlayerCharacter } = require('../../database/models');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resetbalance')
    .setDescription('Return your balance to your center.'),
  async execute(interaction) {
    await interaction.deferReply();
    const pc = await PlayerCharacter.fetch(interaction, { info: 'balance' });
    const recenter = await pc.resetBalance();
    await interaction.followUp(recenter.message);
  },
};
