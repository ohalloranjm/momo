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
    const { id } = interaction.user;
    const pc = await PlayerCharacter.findOne({
      attributes: ['id', 'name', 'fatigue', 'A', 'conditions'],
      where: {
        userId: id,
        active: true,
      },
    });

    if (!pc) {
      await interaction.followUp(
        'Cannot find a player character associated with this account. Use ``/newpc`` to create one.'
      );
      return;
    }

    const mark = interaction.options.getInteger('amount') || 1;

    const response = await pc.markFatigue(mark);
    await interaction.reply(response.message);
  },
};
