const {
  ActionRowBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');

const selectPlaybook = async function (interaction) {
  const select = new StringSelectMenuBuilder()
    .setCustomId('playbook')
    .setPlaceholder('Choose a playbook');

  const playbooks = require('../../playbooks');
  for (const key of Object.keys(playbooks)) {
    const playbook = playbooks[key];
    select.addOptions(
      new StringSelectMenuOptionBuilder()
        .setLabel(playbook.name)
        .setDescription(
          `${playbook.principles[0]} vs. ${playbook.principles[1]}`
        )
        .setValue(playbook.key)
    );
  }

  const row = new ActionRowBuilder().addComponents(select);

  const response = await interaction.followUp({
    content: 'Choose a playbook.',
    components: [row],
  });

  const collectorFilter = i => i.user.id === interaction.user.id;
  try {
    const choice = await response.awaitMessageComponent({
      filter: collectorFilter,
      time: 60_000,
    });

    console.log(choice);

    await choice.update({
      content: `You have selected the ${choice.values[0]}.`,
      components: [],
    });
  } catch (e) {
    console.error(e);
    await interaction.editReply({
      content: 'Confirmation not received within 1 minute, cancelling',
      components: [],
    });
  }
};

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
    await interaction.deferReply({
      ephemeral: true,
    });

    await selectPlaybook(interaction);

    return await interaction.followUp('Howdy');
  },
};
