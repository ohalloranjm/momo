const playbooks = require('../playbooks');
const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');

module.exports = {
  name: 'selectPlaybook',

  async execute(interaction) {
    const select = new StringSelectMenuBuilder()
      .setCustomId('playbook')
      .setPlaceholder('Choose a playbook');

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

    try {
      const choice = await response.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 2 * 60 * 1_000,
      });

      const key = choice.values[0];
      interaction.momo.playbook = playbooks[key];

      await response.delete();
    } catch (err) {
      console.error(err);
      if (err.code === 'InteractionCollectorError') {
        await interaction.editReply({
          content: 'Playbook not chosen within 2 minutes, cancelling',
          components: [],
        });
        interaction.breakChain = true;
      } else {
        throw err;
      }
    }

    return interaction;
  },
};
