const { PlayerCharacter } = require('../../database/models');
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shiftcenter')
    .setDescription('Shift your center (NOT your balance) by one step.')
    .addStringOption(option =>
      option
        .setName('principle')
        .setDescription('The principle to shift your balance toward.')
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.fetch(interaction, { info: 'balance' });
    if (!pc)
      return await interaction.followUp(
        'You have no player characters. ``/newpc`` to create one.'
      );

    const target = interaction.options.getString('principle');
    const { principles } = pc.getPlaybook();
    let shift;

    if (!target) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('left')
            .setStyle(ButtonStyle.Primary)
            .setLabel(principles[0].capitalize())
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId('right')
            .setStyle(ButtonStyle.Primary)
            .setLabel(principles[1].capitalize())
        );

      const choosePrinciple = await interaction.followUp({
        content: 'Choose a balance principle to shift your center toward.',
        components: [row],
      });

      try {
        const chosenPrinciple = await choosePrinciple.awaitMessageComponent({
          filter: i => i.user.id === interaction.user.id,
          time: 60_000,
        });

        const d = chosenPrinciple === 'left' ? -1 : 1;
        shift = await pc.shiftCenter(d);
        await chosenPrinciple.update({
          content: shift.message,
          components: [],
        });
      } catch (err) {
        console.error(err);
        await chosenPrinciple.update({
          content: 'Timed out after 1 minute.',
          components: [],
        });
      }
    }
  },
};
