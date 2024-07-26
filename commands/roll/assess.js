const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('assess')
        .setDescription('Assess a Situation')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll()
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('full', 'Ask two questions. Take +1 ongoing while acting on the answers.')
            .appendText('part', 'Ask one question. Take +1 ongoing while actitng on the answer.')
            .appendBullet('hit', 'What here can I use to ``     ``?')
            .appendBullet('hit', 'Who or what is the biggest threat?')
            .appendBullet('hit', 'What should I be on the lookout for?')
            .appendBullet('hit', 'What’s my best way out/in/through?')
            .appendBullet('hit', 'Who ore what is in the greatest danger?')
            .composeMessage('Assess a Situation')
        );
    },
};