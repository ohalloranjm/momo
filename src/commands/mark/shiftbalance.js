const { PlayerCharacter } = require('../../database/models');
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
} = require('discord.js');
require('../../utils/custom-methods');

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
    let target = interaction.options.getString('principle');
    await interaction.deferReply({ ephemeral: !target });

    const pc = await PlayerCharacter.grab(interaction, 'balance');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const { principles } = pc.getPlaybook();

    let shift = target
      ? await pc.shiftBalance(target)
      : {
          status: 'need-principle',
          message: 'Choose a principle to shift toward.',
        };

    // if no principle or an invalid principle is supplied, prompt with buttons
    if (shift.status === 'need-principle') {
      const row = new ActionRowBuilder();
      const leftButton = new ButtonBuilder()
        .setCustomId('left')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[0]} (${(-pc.balance).sign()})`);
      const rightButton = new ButtonBuilder()
        .setCustomId('right')
        .setStyle(ButtonStyle.Primary)
        .setLabel(`${principles[1]} (${pc.balance.sign()})`);
      row.addComponents(leftButton, rightButton);
      const click = await interaction.followUp({
        content: shift.message,
        components: [row],
      });

      const confirmPrinciple = await click.awaitMessageComponent({
        filter: i => i.user.id === interaction.user.id,
        time: 60_000,
      });

      shift = await pc.shiftBalance(confirmPrinciple.customId);

      await confirmPrinciple.update({
        components: [],
      });
    }

    // if shifting causes loss of balance, confirm with player
    if (shift.status === 'lose-balance') {
      await interaction.followUp(
        shift.message +
          '\n\nMomo can’t help you resolve this move yet; refer to the play materials and run ``/shiftcenter`` and ``/resetbalance`` as needed.'
      );
    }

    // standard success message
    if (shift.status === 'shifted-balance') {
      await interaction.followUp(
        shift.message +
          ` ${(-shift.newBalance).sign()} ${
            principles[0]
          } / ${shift.newBalance.sign()} ${principles[1]}`
      );
    }

    // specifically for '/b center' when already at center
    if (shift.status === 'already-center') {
      await interaction.followUp(shift.message);
    }
  },
};
