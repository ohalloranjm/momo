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
        content: `## Building Player Character: ${i.options.getString(
          'name'
        )}…`,
        ephemeral: true,
      }),

    r.track,
    [r.selectPlaybook, '\n* Playbook: #PB'],
    [r.selectTraining, '\n* Training: #TRAINING'],
    [r.selectStat, `Choose a stat to increase by +1.`],

    async function (interaction) {
      const { playbook, training, stat } = interaction.momo;
      await interaction.followUp(`${interaction.momo}`);
    },
  ],
};
