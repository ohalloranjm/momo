const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('intimidate')
        .setDescription('Intimidate an NPC')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('intimidate an NPC')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'They choose one.')
            .appendText('full', 'First, you pick one they cannot choose.')
            .appendBullet('hit', 'They run to escape or get backup.')
            .appendBullet('hit', 'They back down but keep watch.')
            .appendBullet('hit', 'They give in with a few stipulations.')
            .appendBullet('hit', 'They attack you, but off-balance; the GM marks a condition on them.')
            .composeMessage('Intimidate an NPC')
        );
    },
};