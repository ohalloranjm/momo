const { SlashCommandBuilder } = require('discord.js');
const r = require('../../routes');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newpc')
    .setDescription('Create a new Player Character')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription("Your character's name.")
        .setRequired(true)
    ),

  execute: [
    async i =>
      await i.reply({
        content: `Name: ${i.options.getString('name')}`,
        ephemeral: true,
      }),

    r.acceptInputs,
    r.selectPlaybook,
    r.selectTraining,

    async function (interaction) {
      await interaction.followUp(
        `Hey kids ${interaction.inputs.playbook.name}`
      );
    },
  ],
};
