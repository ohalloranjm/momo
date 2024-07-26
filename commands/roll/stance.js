const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('stance')
        .setDescription('Stance Move')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('take a combat stance')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('part', 'Use one basic or mastered technique.')
            .appendText('full', 'Choose one:')
            .appendBullet('full', 'Mark 1-fatigue to use a learned technique.')
            .appendBullet('Use one practiced technique.')
            .appendBullet('Use two different basic or mastered techniques.')
            .appendText('miss', 'You stumble, but you can shift your balance away from center to use one basic technique.')
            .composeMessage('Stance Move')
        );
    },
};