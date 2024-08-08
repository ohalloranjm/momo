const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SlashCommandBuilder,
} = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { conditions } = require('../../utils/constants');
require('../../utils/custom-methods');

module.exports = {
  alias: 'c',
  data: new SlashCommandBuilder()
    .setName('condition')
    .setDescription('Mark one or more conditions')
    .addStringOption(option =>
      option
        .setName('conditions')
        .setDescription(
          'The name of the condition or conditions to mark, space and/or comma separated'
        )
    ),
  async execute(interaction) {
    const commandString = interaction.options.getString('conditions');

    await interaction.deferReply({ ephemeral: !commandString });

    const pc = await PlayerCharacter.grab(interaction, 'conditions');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const playbookConditions =
      pc.playbook === 'Elder' ? conditions.ELDER : conditions.DEFAULT;
    const alreadyMarked = pc.conditionList();

    if (!commandString) {
      // send a button per condition, disabled if it's chosen, and await the clicking of those buttons

      const buttons = [];

      playbookConditions.forEach((condition, i) => {
        const button = new ButtonBuilder()
          .setCustomId(String(i))
          .setLabel(condition)
          .setStyle(ButtonStyle.Primary);

        if (alreadyMarked.includes(condition)) {
          button.setDisabled(true);
        }

        buttons.push(button);
      });

      const row = new ActionRowBuilder();
      row.addComponents(buttons);

      const sendButtons = await interaction.followUp({
        content: 'Click a condition to mark it.',
        components: [row],
      });

      const collector = sendButtons.createMessageComponentCollector({
        componentType: ComponentType.ButtonInteraction,
        time: 5 * 60 * 1000,
      });

      collector.on('collect', async i => {
        const idx = +i.customId;
        const reply = await pc.setCondition(idx, true);
        buttons[idx].setDisabled();
        row.setComponents(buttons);
        await interaction.editReply({ components: [row] });
        await i.reply(`${pc.name} marks ${playbookConditions[idx]}!`);
      });

      return;
    }

    const targetConditions = commandString.betterSplit(', ', ',', ' ');

    const msgArr = [];
    let savePC = false;

    for (const condition of targetConditions) {
      const { success, message } = await pc.setCondition(condition, true, {
        autosave: false,
      });

      if (success) savePC = true;

      msgArr.push(`* ${message}`);
    }

    if (savePC) await pc.save();
    await interaction.followUp(msgArr.join('\n'));
  },
};
