const { SlashCommandBuilder } = require('discord.js');
const playbooks = require('../playbooks');
const { STATS } = require('../utils/constants');
const { PlayerCharacter } = require('../database/models');
const Roll = require('./roll');

class Move {
  // one- or two-word slash command name, e.g. 'assess'
  constructor(key) {
    this.key = key;
  }

  // full title of the move, e.g. 'Assess a Situation'
  setTitle(title) {
    this.title = title;
    return this;
  }

  // default stat to use when rolling, e.g. 'Harmony'
  setStat(stat) {
    this.stat = stat;
    return this;
  }

  addConditionModifier(conditionName, modifier = -2) {
    if (!this.conditionModifiers) this.conditionModifiers = {};
    this.conditionModifiers[conditionName] = modifier;
    return this;
  }

  // [*], [...hit, part, full, miss], [text]
  appendToResult(...params) {
    this.resultLines = this.resultLines || [];
    this.resultLines.push(params);
    return this;
  }

  command() {
    const move = this;

    return new SlashCommandBuilder()
      .setName(move.key)
      .setDescription(move.title)
      .addIntegerOption(option =>
        option
          .setName('extra-modifier')
          .setDescription(
            `Additional modifiers on top of your ${move.stat}, e.g. hold or ongoing (conditions are automatic)`
          )
      )
      .addStringOption(option => {
        const otherStats = STATS.filter(stat => stat !== move.stat);
        const choices = [
          { name: 'Live up to Your Balance Principle', value: 'balance' },
          { name: 'Conditions Marked', value: 'conditions' },
        ];
        otherStats.forEach(stat => choices.push({ name: stat, value: stat }));
        return option
          .setName('alt-stat')
          .setDescription(
            `Use a different stat, balance principle, or conditions marked for this roll, instead of ${move.stat}`
          )
          .addChoices(choices);
      })
      .addIntegerOption(option =>
        option
          .setName('override-modifier')
          .setDescription(
            `Manually set the total modifier, ignoring all other stats, penalties, and modifiers`
          )
      );
  }

  async respond(interaction) {
    // determine query column
    const stat = interaction.options.getString('alt-stat') || this.stat;
    const override = interaction.options.getInteger('override-modifier');

    // query database for active player
    let pc;
    if (override === null) {
      const attributes = ['conditions'];
      if (STATS.includes(stat) || stat === 'balance') {
        attributes.push(stat);
      }
      pc = await PlayerCharacter.grab(interaction, attributes);
    }

    // process query for stat modifier, format name
    let statValue;
    let statName;
    if (pc) {
      // total number of conditions marked
      if (stat === 'conditions') {
        statValue = pc.conditionsMarked();
        statName = 'Conditions Marked';

        // highest rated balance principle
      } else if (stat === 'balance') {
        statValue = Math.abs(pc.balance);
        const { playbook: playbookKey } = pc;
        const playbook = playbooks[playbookKey];
        const { principles } = playbook;
        statName = principles[+(pc.balance > 0)];

        // one of the four normal stats
      } else {
        statValue = pc[stat];
        statName = stat;
      }
    }

    const roll = new Roll().addModifier(statValue, statName);

    if (pc && this.conditionModifiers) {
      const conditionName = pc
        .conditionList()
        .find(c => Object.keys(this.conditionModifiers).includes(c));
      if (conditionName)
        roll.addModifier(this.conditionModifiers[conditionName], conditionName);
    }

    roll.addModifier(
      override ?? interaction.options.getInteger('extra-modifier')
    );

    roll.sumTotal();

    this.resultLines.forEach(resultLine => {
      if (resultLine[0] === 'bullet') {
        roll.appendBullet(...resultLine.slice(1));
      } else {
        roll.appendText(...resultLine);
      }
    });

    await interaction.reply(roll.composeMessage(this.title));
  }
}

module.exports = Move;
