const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deny')
    .setDescription('Deny a Callout')
    .addStringOption(option =>
      option
        .setName('principle')
        .setDescription('The name of called-out principle')
    )
    .addIntegerOption(option =>
      option
        .setName('extra-modifier')
        .setDescription(
          'Additional modifiers on top of your principle, e.g. hold or ongoing (conditions are automatic)'
        )
    )
    .addIntegerOption(option =>
      option
        .setName('override-modifier')
        .setDescription(
          'Manually set the total modifier, ignoring all other stats, penalties, and modifiers'
        )
    ),

  async execute(interaction) {
    const target = interaction.options.getString('principle');
    await interaction.deferReply({ ephemeral: !target });

    const pc = await PlayerCharacter.grab(interaction, [
      'conditions',
      'balance',
    ]);

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
