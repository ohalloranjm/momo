const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('callout')
        .setDescription('Call Someone Out')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll()
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'They are called to act as you say; they must either do it or mark a condition.')
            .appendText('part', 'And they challenge your view of the world in turn; mark 1-fatigue or they shift your balance as they choose.')
            .appendText('miss', 'They can demand you act in accordance with one of your principles instead; mark a condition or act as they request.')
            .composeMessage('Call Someone Out')
        );
    },
};