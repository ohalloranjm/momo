const playbooks = require('../playbooks');
const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require('discord.js');

module.exports = {
  name: 'selectPlaybook',

  async execute(interaction, message) {
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

    const options = await interaction.editReply({
      components: [row],
    });

    try {
      const choice = await options.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 5 * 60 * 1_000,
      });

      const pbKey = choice.values[0];
      const playbook = playbooks[pbKey];

      const replyEdits = {
        components: [],
      };

      if (message) {
        const reply = await interaction.fetchReply();
        replyEdits.content =
          reply.content + message.replace('#PB', playbook.name);
      }

      await choice.update(replyEdits);
      return playbook;
    } catch (err) {
      if (err.code === 'InteractionCollectorError') {
        await interaction.editReply({
          content: 'Playbook not chosen within 5 minutes, cancelling',
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
