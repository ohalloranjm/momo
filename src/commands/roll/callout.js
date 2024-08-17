const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('callout')
    .setDescription('Call Someone Out')
    .addIntegerOption(option =>
      option
        .setName('modifier')
        .setDescription(
          'The called-out principle, plus modifiers (conditions are auto-applied)'
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();

    const pc = await PlayerCharacter.grab(interaction, 'conditions');

    const roll = new Roll().addModifier(
      interaction.options.getInteger('modifier')
    );

    if (pc) {
      if (pc.conditionList().includes('Afraid')) {
        roll.addModifier(-2, 'Afraid');
      } else if (pc.conditionList().includes('Remorseful')) {
        roll.addModifier(1, 'Remorseful');
      }
    }

    await interaction.followUp(
      roll
        .sumTotal()
        .appendText(
          'hit',
          'They are called to act as you say; they must either do it or mark a condition.'
        )
        .appendText(
          'part',
          'And they challenge your view of the world in turn; mark 1-fatigue or they shift your balance as they choose.'
        )
        .appendText(
          'miss',
          'They can demand you act in accordance with one of your principles instead; mark a condition or act as they request.'
        )
        .composeMessage('Call Someone Out')
    );
  },
};
