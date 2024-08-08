const { SlashCommandBuilder } = require('discord.js');
const { TRAININGS } = require('../../utils/constants');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newtraining')
    .setDescription('Add an extra training or change your existing training')
    .addStringOption(option =>
      option
        .setName('training')
        .setDescription('The training to add')
        .addChoices(
          TRAININGS.map(t => {
            return { name: t, value: t };
          })
        )
        .setRequired(true)
    )
    .addBooleanOption(option =>
      option
        .setName('replace')
        .setDescription(
          'False by default. If true, delete and replace your existing training(s)'
        )
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const pc = await PlayerCharacter.grab(interaction, 'training');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const target = interaction.options.getString('training');
    if (pc[target]) {
      return await interaction.followUp(
        `${pc.name} is already trained in ${target}.`
      );
    }

    pc[target] = true;

    const replace = interaction.options.getBoolean('replace');
    if (replace) {
      TRAININGS.filter(t => t !== target).forEach(t => (pc[t] = false));
    }

    await pc.save();
    await interaction.followUp(
      `${pc.name}’s training has been set to: **${pc.trainingList(true)}**`
    );
  },
};
