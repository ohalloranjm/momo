const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('deny')
        .setDescription('Deny a Callout')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('deny a callout')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'Act as they say or mark 1-fatigue.')
            .appendText('full', 'Their words hit hard; you must also shift your balance toward the called-on principle.')
            .appendText('miss', 'They can demand you act in accordance with one of your principles instead; mark a condition or act as they request.')
            .composeMessage('Deny a Callout')
        );
    },
};