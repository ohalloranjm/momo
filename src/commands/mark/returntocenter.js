const { PlayerCharacter } = require('../../database/models');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('returntocenter')
    .setDescription('Return your balance to your center.'),

  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.grab(interaction, 'balance');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const recenter = await pc.resetBalance();
    await interaction.followUp(recenter.message);
  },
};
