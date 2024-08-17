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
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);
    const oldName = pc.name;
    const newName = interaction.options.getString('new-name');

    if (oldName === newName) {
      return await interaction.followUp(
        `Your character’s name is already ${newName}!`
      );
    }

    try {
      pc.name = newName;
      await pc.save();
      await interaction.followUp(
        `Your active character’s name is now ${pc.name}.\n*(Former name: ${oldName})*`
      );
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        await interaction.followUp(
          `You already have a character named ${newName}! Please choose a different name, or delete your existing ${newName} character using \`\`/delete-pc\`\`.`
        );
      } else {
        throw err;
      }
    }
  },
};
