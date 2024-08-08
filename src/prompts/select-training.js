const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const { TRAININGS } = require('../utils/constants');

module.exports = {
  name: 'selectTraining',

  async execute(interaction, message, tempMessage = '\nChoose a training.') {
    const buttons = TRAININGS.map(training =>
      new ButtonBuilder()
        .setCustomId(training)
        .setLabel(training)
        .setStyle(ButtonStyle.Primary)
    );

    const row1 = new ActionRowBuilder().addComponents(buttons.slice(0, 3));
    const row2 = new ActionRowBuilder().addComponents(buttons.slice(3));

    const replyEdits = { components: [row1, row2] };

    const reply = await interaction.fetchReply();

    if (tempMessage) {
      replyEdits.content = reply.content + tempMessage;
    }

    const options = await interaction.editReply(replyEdits);

    const choice = await options.awaitMessageComponent({
      time: 2 * 60 * 1_000,
    });

    await choice.deferUpdate();

    const training = choice.customId;

    const finalEdits = {
      components: [],
      content: reply.content,
    };
    if (message) finalEdits.content += message.replace('#TRAINING', training);

    await interaction.editReply(finalEdits);
    return training;
  },
};
