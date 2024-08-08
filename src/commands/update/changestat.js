const { SlashCommandBuilder } = require('discord.js');
const { STATS } = require('../../utils/constants');
const { PlayerCharacter } = require('../../database/models');
require('../../utils/custom-methods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changestat')
    .setDescription('Change your Creativity, Focus, Harmony, or Passion.')
    .addStringOption(option =>
      option
        .setName('stat')
        .setDescription('The stat to update.')
        .addChoices(
          STATS.map(stat => {
            return { name: stat, value: stat };
          })
        )
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option
        .setName('new-value')
        .setDescription(
          'The new value of the selected stat; must be between -1 and +3.'
        )
        .setMinValue(-1)
        .setMaxValue(3)
        .setRequired(true)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const stat = interaction.options.getString('stat');
    const newValue = interaction.options.getInteger('new-value');
    const pc = await PlayerCharacter.grab(interaction, stat);

    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    if (pc[stat] === newValue)
      return await interaction.followUp(`Your ${stat} is already ${newValue}.`);

    pc[stat] = newValue;
    await pc.save();
    await interaction.followUp(`${pc.name}’s ${stat} is now ${newValue}.`);
  },
};
