const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { TRAININGS } = require('../constants');

module.exports = {
  name: 'selectTraining',

  async execute(interaction) {
    const buttons = TRAININGS.map(training =>
      new ButtonBuilder()
        .setCustomId(training)
        .setLabel(training)
        .setStyle(ButtonStyle.Primary)
    );

    const row1 = new ActionRowBuilder().addComponents(buttons.slice(0, 3));
    const row2 = new ActionRowBuilder().addComponents(buttons.slice(3));

    const options = await interaction.followUp({
      content: 'Choose a training.',
      components: [row1, row2],
    });

    try {
      const choice = await options.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 2 * 60 * 1_000,
      });

      const training = choice.customId;

      await choice.update({
        content: `Training: ${training}`,
        components: [],
      });

      interaction.inputs.training = training;
    } catch (err) {
      if (err.code === 'InteractionCollectorError') {
        await interaction.editReply({
          content: 'Training not chosen within 2 minutes, cancelling',
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
