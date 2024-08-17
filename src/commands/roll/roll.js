const { SlashCommandBuilder } = require('discord.js');
const { Roll } = require('../../classes');
const { PlayerCharacter } = require('../../database/models');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Roll 2d6 with an optional modifier')
    .addStringOption(option =>
      option
        .setName('stat')
        .setDescription('A stat to add to your roll')
        .addChoices(
          { name: 'Creativity', value: 'Creativity' },
          { name: 'Focus', value: 'Focus' },
          { name: 'Harmony', value: 'Harmony' },
          { name: 'Passion', value: 'Passion' },
          { name: 'Higher Balance Principle', value: 'balance' },
          { name: 'Conditions Marked', value: 'conditions' }
        )
    )
    .addIntegerOption(option =>
      option
        .setName('modifier')
        .setDescription('A number to add or subtract from your roll')
    ),

  async execute(interaction) {
    const roll = new Roll();

    const stat = interaction.options.getString('stat');
    if (stat) {
      const pc = await PlayerCharacter.grab(interaction, stat);
      if (pc && stat === 'conditions') {
        roll.addModifier(pc.conditionsMarked(), 'Conditions Marked');
      } else if (pc && stat === 'balance') {
        roll.addModifier(
          Math.abs(pc.balance),
          pc.getPlaybook().principles[pc.balance > 0 ? 1 : 0]
        );
      } else if (pc) {
        roll.addModifier(pc[stat], stat);
      }
    }

    const modifier = interaction.options.getInteger('modifier');
    if (modifier !== null) roll.addModifier(modifier);

    await interaction.reply(
      roll
        .sumTotal()
        .appendText('full', 'Hard hit!')
        .appendText('part', 'Partial hit!')
        .appendText('miss', 'Miss!')
        .composeMessage('Roll 2d6')
    );
  },
};
