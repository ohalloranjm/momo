const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('plead')
        .setDescription('Plead with an NPC')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('plead with an NPC')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('full', 'They act now and do their best until the situation changes.')
            .appendText('part', 'They need something more—evidence that this is the right course, guidance in making the right choices, or resources to aid them—before they act; the GM tells you what they need.')
            .composeMessage('Plead with an NPC')
        );
    },
};