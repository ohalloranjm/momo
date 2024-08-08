const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('changename')
    .setDescription('Change the name of your active character')
    .addStringOption(option =>
      option
        .setName('new-name')
        .setDescription('Your character’s new name')
        .setRequired(true)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const pc = await PlayerCharacter.grab(interaction);
    if (!pc) await interaction.followUp(PlayerCharacter.nopc);
    const oldName = pc.name;
    pc.name = interaction.options.getString('name');
    await pc(save);
    await interaction.followUp(
      `Your active character’s name is now ${pc.name}\n(Former name: ${oldName})`
    );
  },
};
