const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('push')
        .setDescription('Push Your Luck')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('push your luck')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'You do it, but it costs you to scrape by; the GM tells you what it costs you.')
            .appendText('full', 'Your boldness pays off despite the cost; the GM tells you what other lucky opportunity falls in your lap.')
            .composeMessage('Push Your Luck')
        );
    },
};