const { SlashCommandBuilder } = require('discord.js');
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

  async execute(interaction) {
    await interaction.reply({
      content: `## Building Player Character: ${interaction.options.getString(
        'name'
      )}…`,
      ephemeral: true,
    });
    const r = require('../../routes')(interaction);

    r.track();
    await r.selectPlaybook('\n* Playbook: #PB');
    await r.selectTraining('\n* Training: #TRAINING');
    await r.selectStat();

    // async function (interaction) {
    //   const { playbook, training, stat } = interaction.momo;
    //   await interaction.followUp(`${interaction.momo}`);
    // },
  },
};
