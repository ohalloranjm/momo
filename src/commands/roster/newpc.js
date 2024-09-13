const { SlashCommandBuilder } = require('discord.js');
const { STATS } = require('../../utils/constants');
const { PlayerCharacter } = require('../../database/models');
const { playbookMenu, trainingButtons } = require('../../components');
const { playbooks } = require('../../playbooks');

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

    const contentArr = [`## Building Player Character: ${name}…`];
    let content;
    const buildContent = () => (content = contentArr.join('\n'));
    buildContent();

    console.log(playbookMenu);
    let components = playbookMenu;

    const pbOptions = await interaction.followUp({ content, components });

    const pbChoice = await pbOptions.awaitMessageComponent({
      time: 5 * 60 * 1000,
    });

    await pbChoice.deferUpdate();

    const pbKey = pbChoice.values[0];
    const playbook = playbooks[pbKey];

    contentArr.push(`**Playbook:** ${playbook.name}`, 'Select your training.');
    buildContent();
    components = trainingButtons;

    const trainingOptions = await interaction.editReply({
      content,
      components,
    });

    const trainingChoice = await trainingOptions.awaitMessageComponent({
      time: 2 * 60 * 1000,
    });

    await trainingChoice.deferUpdate();
    const training = trainingChoice.customId;

    contentArr[2] = `**Training:** ${training}`;
    buildContent();

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
