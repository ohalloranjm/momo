const { Roll, StanceMove } = require('../../classes');
const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');

const evade = new StanceMove('evade').setTitle('Evade & Observe');

module.exports = {
  data: new SlashCommandBuilder()
    .setName(evade.key)
    .setDescription(evade.title)
    .addIntegerOption(option =>
      option
        .setName('extra-modifier')
        .setDescription(
          `Additional modifiers on top of your Creativity or Harmony, e.g. hold or ongoing (not conditions)`
        )
    )
    .addStringOption(option =>
      option
        .setName('alt-stat')
        .setDescription(
          'Use a different stat/principle/conditions marked for this roll, instead of Creativity or Harmony'
        )
        .addChoices([
          { name: 'Live up to Your Balance Principle', value: 'balance' },
          { name: 'Conditions Marked', value: 'conditions' },
          { name: 'Focus', value: 'Focus' },
          { name: 'Passion', value: 'Passion' },
        ])
    )
    .addIntegerOption(option =>
      option
        .setName('override-modifier')
        .setDescription(
          `Manually set the total modifier, ignoring all other stats, penalties, and modifiers`
        )
    ),

  async execute(interaction) {
    await interaction.deferReply();
    const override = interaction.options.getInteger('override-modifier');

    let pc;
    let altStat;
    if (override === null) {
      const attributes = ['conditions'];
      altStat = interaction.options.getString('alt-stat');
      if (['balance', 'Focus', 'Passion'].includes(altStat)) {
        attributes.push(altStat);
      } else if (!altStat) {
        attributes.push('Creativity', 'Harmony');
      }

      pc = await PlayerCharacter.grab(interaction, attributes);
    }

    let statValue;
    let statName;
    if (pc) {
      //total number of conditions marked
      if (altStat === 'conditions') {
        statValue = pc.conditionsMarked();
        statName = 'Conditions Marked';
      } else if (altStat === 'balance') {
        statValue = Math.abs(pc.balance);
        const { principles } = pc.getPlaybook();
        statName = principles[+(pc.balance > 0)];
      } else if (altStat) {
        statValue = pc[altStat];
        statName = altStat;
      } else if (pc.Creativity >= pc.Harmony) {
        statValue = pc.Creativity;
        statName = 'Creativity';
      } else {
        statValue = pc.Harmony;
        statName = 'Harmony';
      }
    }

    const roll = new Roll().addModifier(statValue, statName);

    if (pc && pc.conditionList().includes('Remorseful')) {
      roll.addModifier(-2, 'Remorseful');
    }

    if (override === null) {
      roll.addModifier(interaction.options.getInteger('extra-modifier'));
    } else {
      roll.addModifier(override);
    }

    roll.sumTotal();

    evade.resultLines.forEach(resultLine => {
      if (resultLine[0] === 'bullet') {
        roll.appendBullet(...resultLine.slice(1));
      } else {
        roll.appendText(...resultLine);
      }
    });

    await interaction.followUp(roll.composeMessage(evade.title));
  },
};
