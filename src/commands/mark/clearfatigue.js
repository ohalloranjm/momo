const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  alias: 'xf',
  data: new SlashCommandBuilder()
    .setName('clearfatigue')
    .setDescription('Clear one or more fatigue.')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('Clear 2 or more fatigue at once')
        .setMinValue(1)
        .setMaxValue(5)
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.grab(interaction, 'fatigue');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    if (!pc.fatigue)
      return await interaction.followUp(`${pc.name} has no fatigue to clear.`);

    const n = interaction.options.getInteger('amount') || 1;
    pc.fatigue = Math.max(0, pc.fatigue - n);
    await pc.save();

    if (pc.fatigue) {
      return await interaction.followUp(
        `${pc.name} clears ${n}-fatigue, bringing them to ${pc.fatigue}-fatigue.`
      );
    } else {
      return await interaction.followUp(`${pc.name} clears all fatigue.`);
    }
  },
};
