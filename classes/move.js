const { SlashCommandBuilder } = require('discord.js');
const { playbooks, STATS } = require('../game_pieces');
const { PlayerCharacter } = require('../db/models');
const Roll = require ('./roll');
require('../formatters');

class Move {
    constructor(key) {
        this.key = key;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setStat(stat) {
        this.stat = stat;
        this.Stat = stat.capitalize();
        return this;
    }

    command() {
        
        const move = this;

        return new SlashCommandBuilder()
            .setName(move.key)
            .setDescription(move.title)
            .addIntegerOption(option => 
                option.setName('extra-modifier')
                    .setDescription(`An extra modifier added on top of your ${move.Stat}.`)
            )
            .addStringOption(option => {
                const otherStats = STATS.filter(stat => stat !== move.stat);
                const choices = [
                    { name: 'Live up to Your Balance Principle', value: 'balance' },
                    { name: 'Conditions Marked', value: 'conditions' }    
                ];
                otherStats.forEach(stat => choices.push({ name: stat.capitalize(), value: stat}));
                return option.setName('alt-stat')
                    .setDescription('A stat to use INSTEAD of Creativity.')
                    .addChoices(choices)
                }
            )
    }

    async respond(interaction) {

        // determine query row
        const { id } = interaction.user;

        // determine query column
        const attributes = ['playbook'];
        const stat = interaction.options.getString('alt-stat') || this.stat;

        if (STATS.includes(stat) || stat === 'balance') {
            attributes.push(stat);
        } else if (stat === 'conditions') {
            attributes.push('conditionA', 'conditionB', 'conditionC', 'conditionD', 'conditionE')
        }

        // query database for active player
        const activePC = await PlayerCharacter.findOne({
            attributes: attributes,
            where: {
                userId: id,
                active: true,
            }
        });

        // process query for stat modifier, format name
        let statValue;
        let statName;
        if (activePC) {

            // total number of conditions marked
            if (stat === 'conditions') {
                const { conditionA, conditionB, conditionC, conditionD, conditionE } = activePC;
                statValue = [ conditionA, conditionB, conditionC, conditionD, conditionE ].reduce((sum, marked) => +marked + sum, 0);
                statName = 'Conditions Marked';

            // highest rated balance principle
            } else if (stat === 'balance') {
                statValue = Math.abs(activePC.balance);
                const { playbook: playbookKey } = activePC;
                const playbook = playbooks[playbookKey];
                const { principles } = playbook;
                console.log(principles);
                statName = principles[+(activePC.balance > 0)];

            // one of the four normal stats
            } else {
                statValue = activePC[stat];
                statName = stat.capitalize();
            }

            const roll = new Roll()

        }

        await interaction.reply(`Hello! ${statName}: ${statValue}`);

    }

    
}

module.exports = Move;