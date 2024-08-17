const { STATS } = require('../utils/constants');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
require('../utils/custom-methods');

module.exports = {
  name: 'selectStat',

  async execute(interaction, options = {}) {
    const { excludedStats, buttonValues, tempMessage } = options;

    const buttons = STATS.map(stat => {
      const button = new ButtonBuilder()
        .setCustomId(stat)
        .setStyle(ButtonStyle.Primary);
      if (excludedStats && excludedStats.includes(stat)) button.setDisabled();
      if (buttonValues) {
        button.setLabel(`${stat} (${buttonValues[stat].sign()})`);
      } else {
        button.setLabel(stat);
      }
      return button;
    });
    const row = new ActionRowBuilder().addComponents(buttons);

    const reply = await interaction.fetchReply();
    let { content } = reply;

    if (tempMessage) content += tempMessage;

    const selection = await interaction.editReply({
      content,
      components: [row],
    });

    const choice = await selection.awaitMessageComponent({
      time: 2 * 60 * 1_000,
    });

    await choice.deferUpdate();

    await interaction.editReply({
      content: reply.content,
      components: [],
    });

    return choice.customId;
  },
};
