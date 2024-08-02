const { PlayerCharacter } = require('../../database/models');
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require('discord.js');

module.exports = {
  alias: 'b',
  data: new SlashCommandBuilder()
    .setName('shiftbalance')
    .setDescription('Shift your balance.')
    .addStringOption(option =>
      option
        .setName('principle')
        .setDescription(
          'The principle or direction to shift your balance toward.'
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.fetch(interaction, {
      info: 'balance',
    });

    let target = interaction.options.getString('principle') || 'away';
    const { principles } = pc.getPlaybook();

    // defaults to shifting away from center
    let shift = await pc.shiftBalance(target);

    // if balance is at center and no principle is supplied, ask for principle and try again
    if (shift.status === 'need-principle') {
      const row = new ActionRowBuilder();
      const leftButton = new ButtonBuilder()
        .setCustomId('left')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[0].capitalize()} (${(-pc.balance).sign()})`);
      const rightButton = new ButtonBuilder()
        .setCustomId('right')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[1].capitalize()} (${pc.balance.sign()})`);
      row.addComponents(leftButton, rightButton);
      const click = await interaction.followUp({
        content:
          'Your balance is currently at your center. Choose a principle to shift toward.',
        components: [row],
      });

      const collectorFilter = i => i.user.id === interaction.user.id;

      try {
        const confirmPrinciple = await click.awaitMessageComponent({
          filter: collectorFilter,
          time: 10_000,
        });

        console.log(confirmPrinciple.customId);

        shift = await pc.shiftBalance(confirmPrinciple.customId);

        await interaction.editReply({
          content: 'Hell yeah.',
          components: [],
        });
      } catch (e) {
        console.error(e);
        await interaction.editReply({
          content: 'Confirmation not received within 1 minute, cancelling',
          components: [],
        });
      }
    }

    // if shifting causes loss of balance, check whether it's between sessions
    if (shift.status === 'lose-balance') {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId('lose')
          .setStyle(ButtonStyle.Primary)
          .setLabel(
            `Lose Balance toward ${
              pc.balance < 0 ? principles[0] : principles[1]
            }`,
            new ButtonBuilder()
              .setCustomId('keep')
              .setStyle(ButtonStyle.Secondary)
              .setLabel("Don't Lose Balance")
          )
      );
      const leftButton = new ButtonBuilder()
        .setCustomId('left')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[0].capitalize()} (${(-pc.balance).sign()})`);
      const rightButton = new ButtonBuilder()
        .setCustomId('right')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[1].capitalize()} (${pc.balance.sign()})`);
      row.addComponents(leftButton, rightButton);
    }

    console.log(shift);
  },
};
