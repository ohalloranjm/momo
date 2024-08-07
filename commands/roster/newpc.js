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
    const playbook = await r.selectPlaybook('\n* Playbook: #PB');
    const training = await r.selectTraining('\n* Training: #TRAINING');
    console.log(playbook, training);

    await r.selectStat();
  },
};
