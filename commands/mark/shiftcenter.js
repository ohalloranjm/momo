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

    const pc = await PlayerCharacter.grab(interaction, 'balance');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const target = interaction.options.getString('principle');
    const { principles } = pc.getPlaybook();
    let shift;

    if (!target) {
      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('left')
            .setStyle(ButtonStyle.Primary)
            .setLabel(principles[0])
        )
        .addComponents(
          new ButtonBuilder()
            .setCustomId('right')
            .setStyle(ButtonStyle.Primary)
            .setLabel(principles[1])
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

        const d = chosenPrinciple.customId === 'left' ? -1 : 1;
        shift = await pc.shiftCenter(d);
        console.log(shift);
        await chosenPrinciple.update({
          content: shift.message,
          components: [],
        });
      } catch (err) {
        console.error(err);
        await choosePrinciple.update({
          content: 'Timed out after 1 minute.',
          components: [],
        });
      }
    }
  },
};
