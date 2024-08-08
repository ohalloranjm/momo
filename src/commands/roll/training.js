const { SlashCommandBuilder } = require('discord.js');
const Roll = require('../../classes/roll.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('training')
        .setDescription('Training Move')
        .addIntegerOption(option =>
            option.setName('modifier')
                .setDescription('A number to add to your roll, or a negative number to subtract from it.')
        ),
    async execute(interaction) {
        await interaction.reply(new Roll('train to learn a new technique')
            .addModifier(interaction.options.getInteger('modifier'))
            .sumTotal()
            .appendText('hit', 'You learn the technique, and your master shifts your balance.')
            .appendText('full', 'You learn it with ease, and it takes as little time as possible')
            .appendText('part', 'It either takes more time than normal, or you must mark two conditions.')
            .appendText('miss', 'You can’t learn the technique yet because you need another lesson before you can grasp its full use. Your master will tell you what additional task you must undertake to put yourself into the correct state of mind; do it, and you learn the technique.')
            .composeMessage('Training Move')
        );
    },
};