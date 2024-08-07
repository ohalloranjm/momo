const { STATS } = require('../constants');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'selectStat',

  async execute(interaction, tempMessage) {
    const { default: statVals } = interaction.momo.playbook;

    const exclude = Object.keys(statVals).filter(stat => statVals[stat] === 2);

    const buttons = STATS.map(stat => {
      const button = new ButtonBuilder()
        .setCustomId(stat)
        .setLabel(`${stat} (${statVals[stat]})`)
        .setStyle(ButtonStyle.Primary);

      if (exclude.includes(stat)) button.setDisabled();

      return button;
    });

    const row = new ActionRowBuilder().addComponents(buttons);

    await interaction.editReply({ components: [row] });
    interaction.breakChain = true;
  },
};
