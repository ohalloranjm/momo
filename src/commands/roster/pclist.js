const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
require('../../utils/custom-methods');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pclist')
    .setDescription('Lists your player characters.'),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const roster = await PlayerCharacter.grab(interaction, { roster: true });
    if (!roster.length) return await interaction.followUp(PlayerCharacter.nopc);

    await interaction.followUp(
      roster
        .map(
          pc =>
            `* ${pc.name}: The ${pc.playbook}${pc.active ? ' [active PC]' : ''}`
        )
        .join('\n')
    );
  },
};
