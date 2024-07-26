const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('resist')
        .setDescription('Resist Shifting Your Balance')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('resist shifting your balance')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('full', 'Choose two:')
            .appendText('part', 'Choose one:')
            .appendBullet('hit', 'Clear a condition or mark growth by immediately acting to prove them wrong.')
            .appendBullet('Shift your balance towards the opposite principle.')
            .appendBullet('Learn what their principle is (if they have one); if you already know, take +1 forward against them.')
            .appendText('miss', 'They know just what to say to throw you off balance. Mark a condition, and the GM shifts your balance twice.')
            .composeMessage('Resist Shifting Your Balance')
        );
    },
};