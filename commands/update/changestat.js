const { SlashCommandBuilder } = require('discord.js');
const { STATS } = require('../../constants');
const { PlayerCharacter } = require('../../database/models');
require('../../functions');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changestat')
    .setDescription('Change your creativity, focus, harmony, or passion.')
    .addStringOption(option =>
      option
        .setName('stat')
        .setDescription('The stat to update.')
        .addChoices(
          STATS.map(stat => {
            return { name: stat.capitalize(), value: stat };
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
    const pc = await PlayerCharacter.fetch(interaction, { info: stat });

    if (!pc)
      return await interaction.followUp(
        'There are no player characters associated with your account. Use ``/newpc`` to create one.'
      );

    if (pc[stat] === newValue)
      return await interaction.followUp(
        `Your ${stat.capitalize()} is already ${newValue}.`
      );

    pc[stat] = newValue;
    await pc.save();
    await interaction.followUp(
      `${pc.name}’s ${stat.capitalize()} is now ${newValue}.`
    );
  },
};
