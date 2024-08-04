const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SlashCommandBuilder,
} = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { conditions } = require('../../constants');
require('../../functions');

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
    await interaction.deferReply();

    const pc = await PlayerCharacter.fetch(interaction, {
      info: ['conditions', 'playbook'],
    });

    if (!pc)
      return await interaction.followUp(
        'You have no player characters. ``/newpc`` to create one.'
      );

    const playbookConditions =
      pc.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;
    const alreadyMarked = pc.conditionList();

    const commandString = interaction.options.getString('condition');

    if (!commandString) {
      // send a button per condition, disabled if it's chosen, and await the clicking of those buttons

      const buttons = [];

      playbookConditions.forEach((condition, i) => {
        const button = new ButtonBuilder()
          .setCustomId(i)
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
        const idx = i.customId;
        await pc.setCondition(idx, true);
        buttons[idx].setDisabled();
        row.setComponents(buttons);
        await interaction.editReply({ components: [row] });
        await i.reply(`${pc.name} marks ${playbookConditions[idx]}!`);
      });

      return;
    }

    const targetConditions = commandString.betterSplit(', ', ',', ' ');

    let msgArr = [];
    let savePC = false;

    for (const condition of targetConditions) {
      if (playbookConditions.includes(condition)) {
        const idx = playbookConditions.indexOf(condition);
        if (alreadyMarked.includes(condition)) {
          msgArr.push(
            `* ${pc.name} is already ${condition}. Choose a different condition to mark.`
          );
        } else {
          await pc.setCondition(idx, true, { autosave: false });
          savePC = true;
          msgArr.push(`* ${pc.name} marks ${condition}!`);
        }
      } else {
        msgArr.push(
          `* ${condition.capitalize()} is not a valid condition for your playbook.`
        );
      }
    }

    if (savePC) await pc.save();
    await interaction.followUp(msgArr.join('\n'));
  },
};
