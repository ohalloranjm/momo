const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { STATS } = require('../../utils/constants');
require('../../utils/custom-methods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pcinfo')
    .setDescription('Displays information about your active player character.')
    .addBooleanOption(option =>
      option
        .setName('public')
        .setDescription(
          'Set true if you want other people to see your character’s stats, too.'
        )
    ),
  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: !interaction.options.getBoolean('public'),
    });

    const pc = await PlayerCharacter.grab(interaction, { allInfo: true });
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const { principles } = pc.getPlaybook();

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`${pc.name}, the ${pc.playbook}`)
      .addFields(
        {
          name: 'Stats',
          value: STATS.map(s => `${s} ${pc[s].sign()}`).join(', '),
        },
        {
          name: 'Balance',
          value: `${(-pc.balance).sign()} ${
            principles[0]
          } / ${pc.balance.sign()} ${
            principles[1]
          } (Center: ${(-pc.center).sign()}/${pc.center.sign()})`,
        },
        {
          name: 'Conditions',
          value: pc.conditionList(true),
        },
        { name: 'Fatigue', value: `${pc.fatigue}/5`, inline: true },
        { name: 'Training', value: pc.trainingList(true), inline: true }
      );

    interaction.followUp({ embeds: [embed] });
  },
};
