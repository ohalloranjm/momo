const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('guide')
        .setDescription('Guide and Comfort')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('guide and comfort someone')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'They choose one:')
            .appendBullet('hit', 'They embrace your guidance and comfort. They may clear a condition or 2-fatigue, and you may ask one question; they must answer honestly.')
            .appendText('full', 'You may also shift their balance.')
            .appendBullet('hit', 'They shut you down. They inflict a condition on you, and you shift their balance in response.')
            .composeMessage('Guide and Comfort')
        );
    },
};