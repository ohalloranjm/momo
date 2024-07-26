const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('rely')
        .setDescription('Rely on Your Skills and Training')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('rely on your skills and training')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('full', 'You do it.')
            .appendText('part', 'You do it imperfectly—the GM tells you how your approach might lead to unexpected consequences; accept those consequences or mark 1-fatigue.')
            .composeMessage('Rely on Your Skills & Training')
        );
    },
};