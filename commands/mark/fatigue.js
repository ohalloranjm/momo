const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  alias: 'f',
  data: new SlashCommandBuilder()
    .setName('fatigue')
    .setDescription('Mark fatigue')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Mark 2 or more fatigue at once')
        .setMinValue(1)
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.grab(interaction, [
      'fatigue',
      'conditions',
    ]);
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const mark = interaction.options.getInteger('amount') || 1;

    const response = await pc.markFatigue(mark);
    await interaction.followUp(response.message);
  },
};
