const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ComponentType,
  SlashCommandBuilder,
} = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { conditions } = require('../../utils/constants');

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

    const pc = await PlayerCharacter.grab(interaction, 'conditions');
    if (!pc) return await interaction.followUp(PlayerCharacter.nopc);

    const playbookConditions =
      pc.playbook === 'Elder' ? conditions.ELDER : conditions.DEFAULT;

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
        await i.reply(`${pc.name} clears ${playbookConditions[idx]}`);
      });

      return;
    }

    require('../../utils/custom-methods');
    const targetConditions = commandString.betterSplit(', ', ',', ' ');

    const msgArr = [];
    let savePC = false;

    for (const condition of targetConditions) {
      const { success, message } = await pc.setCondition(condition, false, {
        autosave: false,
      });

      if (success) savePC = true;

      msgArr.push(`* ${message}`);
    }

    if (savePC) await pc.save();
    await interaction.followUp(msgArr.join(`\n`));
  },
};
