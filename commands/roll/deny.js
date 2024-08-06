const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deny')
    .setDescription('Deny a Callout')
    .addIntegerOption(option =>
      option
        .setName('modifier')
        .setDescription(
          'A number to add to your roll, or a negative number to subtract from it.'
        )
    ),
  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.grab(interaction, 'conditions');

    const roll = new Roll().addModifier(
      interaction.options.getInteger('modifier')
    );

    if (pc) {
      const markedConditions = pc.conditionList();
      if (markedConditions.includes('Guilty')) {
        roll.addModifier(2, 'Guilty');
      } else if (markedConditions.includes('Worried')) {
        roll.addModifier(2, 'Worried');
      }
    }

    await interaction.followUp(
      roll
        .sumTotal()
        .appendText('hit', 'Act as they say or mark 1-fatigue.')
        .appendText(
          'full',
          'Their words hit hard; you must also shift your balance toward the called-on principle.'
        )
        .appendText(
          'miss',
          'You stand strong; clear a condition, clear 1-fatigue, or shift your balance, your choice.'
        )
        .composeMessage('Deny a Callout')
    );
  },
};
