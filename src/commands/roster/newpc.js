const { SlashCommandBuilder } = require('discord.js');
const { STATS } = require('../../utils/constants');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newpc')
    .setDescription('Create a new Player Character')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription("Your character's name.")
        .setRequired(true)
        .setMaxLength(200)
    ),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });
    const otherPCs = await PlayerCharacter.grab(interaction, { roster: true });

    if (otherPCs.length >= 5) {
      return await interaction.followUp(
        'You’ve reached your maximum of five player characters. To create a new one, first use ``/delete-pc`` to delete an existing character.'
      );
    }

    const name = interaction.options.getString('name');
    if (otherPCs.some(pc => pc.name === name)) {
      return await interaction.followUp(
        `You already have a character named ${name}. Please choose a unique name.`
      );
    }

    await interaction.followUp(`## Building Player Character: ${name}…`);

    const r = require('../../prompts')(interaction);

    const playbook = await r.selectPlaybook('\n* Playbook: #PB');
    const training = await r.selectTraining('\n* Training: #TRAINING');

    const defaultStats = { ...playbook.defaultStats };
    const excludedStats = STATS.filter(stat => defaultStats[stat] === 2);
    const statIncrease = await r.selectStat({
      excludedStats,
      buttonValues: defaultStats,
      tempMessage: '\nChoose a stat to increase by +1 (max. +2).',
    });

    defaultStats[statIncrease]++;
    const { Creativity, Focus, Harmony, Passion } = defaultStats;

    const newPC = PlayerCharacter.build({
      userId: interaction.user.id,
      name,
      playbook: playbook.key,
      Creativity,
      Focus,
      Harmony,
      Passion,
    });

    newPC[training] = true;

    await newPC.save();
    const formerActive = otherPCs.find(pc => pc.active);
    if (formerActive) {
      formerActive.active = false;
      await formerActive.save();
    }

    await interaction.followUp({
      content: `${name} is now your active character!`,
      ephemeral: true,
    });
  },
};
