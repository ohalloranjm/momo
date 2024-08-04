const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SlashCommandBuilder,
} = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { conditions } = require('../../constants');
require('../../responses');
require('../../functions');

module.exports = {
  alias: 'xc',
  data: new SlashCommandBuilder()
    .setName('clearcondition')
    .setDescription('Clear one or more conditions.')
    .addStringOption(option =>
      option
        .setName('condition')
        .setDescription(
          'The name of the condition or conditions to mark, space and/or comma separated'
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.fetch(interaction, {
      info: ['conditions', 'playbook'],
    });

    if (!pc) return await interaction.nopc();

    const playbookConditions =
      pc.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

    const markedConditions = pc.conditionList();

    if (!markedConditions.length)
      return await interaction.followUp(`${pc.name} has no conditions marked.`);

    const commandString = interaction.options.getString('condition');

    if (!commandString) {
      // send a button per condition, disabled if it's already clear, and await the clicking of those buttons

      const buttons = [];

      playbookConditions.forEach((condition, i) => {
        const button = new ButtonBuilder()
          .setCustomId(String(i))
          .setLabel(condition)
          .setStyle(ButtonStyle.Success);

        if (!markedConditions.includes(condition)) button.setDisabled(true);

        buttons.push(button);
      });

      const row = new ActionRowBuilder().addComponents(buttons);

      const sendButtons = await interaction.followUp({
        content: 'Click a condition to clear it.',
        components: [row],
      });

      const collector = sendButtons.createMessageComponentCollector({
        componentType: ComponentType.ButtonInteraction,
        time: 5 * 60 * 1000,
      });

      collector.on('collect', async i => {
        const idx = +i.customId;
        await pc.setCondition(idx, false);
        buttons[idx].setDisabled();
        row.setComponents(buttons);
        await interaction.editReply({ components: [row] });
        await i.reply(
          `${pc.name} clears ${playbookConditions[idx].capitalize()}`
        );
      });

      return;
    }

    const targetConditions = commandString
      .betterSplit(', ', ',', ' ')
      .map(str => str[0].toUpperCase() + str.slice(1));

    let msgArr = [];
    let savePC = false;

    for (const condition of targetConditions) {
      if (playbookConditions.includes(condition)) {
        const idx = playbookConditions.indexOf(condition);
        if (!markedConditions.includes(condition)) {
          msgArr.push(
            `* ${pc.name} does not have ${condition} marked. Choose a different condition to clear.`
          );
        } else {
          await pc.setCondition(idx, false, { autosave: false });
          savePC = true;
          msgArr.push(`* ${pc.name} clears ${condition}!`);
        }
      } else {
        msgArr.push(
          `* ${condition} is not a valid condition for your playbook.`
        );
      }
    }

    if (savePC) await pc.save();
    await interaction.followUp(msgArr.join(`\n`));
  },
};
