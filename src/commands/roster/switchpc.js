const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('switchpc')
    .setDescription('Change your active PC to a different PC')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription(
          'The name of the player character you’d like to switch to.'
        )
        .setRequired(true)
        .setMaxLength(200)
    ),
  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const roster = await PlayerCharacter.grab(interaction, { roster: true });
    if (!roster.length) return await interaction.followUp(PlayerCharacter.nopc);

    const name = interaction.options.getString('name');
    const newActive = roster.find(pc => pc.name === name);

    if (!newActive) {
      return await interaction.followUp(
        'There are no player characters with that name associated with your account. Use ``/pclist`` to show a list of your characters; please note that names are case-sensitive.'
      );
    }

    const formerActive = roster.find(pc => pc.active);

    if (formerActive.name === newActive.name) {
      await interaction.followUp(`${name} is already your active character!`);
      return;
    }

    formerActive.active = false;
    await formerActive.save();
    newActive.active = true;
    await newActive.save();

    await interaction.followUp(`${name} is now your active character.`);
  },
};
