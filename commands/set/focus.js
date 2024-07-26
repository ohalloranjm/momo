const { SlashCommandBuilder } = require('discord.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('focus')
        .setDescription('Set your focus stat.')
        .addIntegerOption(option =>
            option.setName('value')
                .setDescription('Your focus stat.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const options = {};
        const value = interaction.options.getInteger('value');
        if (modifier) options.extra = modifier;
        await interaction.reply((new Roll(options)).message);
    },
};