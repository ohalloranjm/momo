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
    const target = interaction.options.getString('principle');
    await interaction.deferReply({ ephemeral: !target });

    const pc = await PlayerCharacter.grab(interaction, 'balance');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const { principles } = pc.getPlaybook();

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

      const chosenPrinciple = await choosePrinciple.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 60_000,
      });

      const d = chosenPrinciple.customId === 'left' ? -1 : 1;
      const shift = await pc.shiftCenter(d);
      await interaction.followUp({
        content: shift.message,
      });
      return await interaction.deleteReply();
    }

    const idx = principles.indexOf(
      principles.find(p => p.toLowerCase() === target.toLowerCase())
    );

    if (idx === -1) {
      await interaction.followUp(
        `${target} is not a valid principle. Choose ${principles[0]} or ${principles[1]}.`
      );
    } else {
      const shift = await pc.shiftCenter(idx === 0 ? -1 : 1);
      await interaction.followUp(shift.message);
    }
  },
};
