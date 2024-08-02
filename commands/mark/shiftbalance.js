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
    const { principles } = pc.getPlaybook();

    let target = interaction.options.getString('principle');
    let shift = target
      ? await pc.shiftBalance(target)
      : {
          status: 'need-principle',
          message: 'Click a principle to choose it.',
        };

    // if no principle or an invalid principle is supplied, prompt with buttons
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
        content: shift.message,
        components: [row],
      });

      try {
        const confirmPrinciple = await click.awaitMessageComponent({
          filter: i => i.user.id === interaction.user.id,
          time: 60_000,
        });

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

    // if shifting causes loss of balance, confirm with player
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
              .setLabel('Don’`t Lose Balance')
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
