const { SlashCommandBuilder } = require('discord.js');
require('../../functions/getPC.js');

module.exports = { 
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Test embed')
        .addStringOption(option => option.setName('name')
            .setDescription('name test')
        )
        .addStringOption(option => option.setName('description')
            .setDescription('description test')
        ),
    async execute(interaction) {
        const pc = await interaction.getPC({
            info: ['balance']
        });
        await interaction.reply(`Hi, ${pc.name} the ${pc.playbook}. You have ${pc.conditionsMarked()} conditions marked, and they're ${pc.conditionList(true)}`);
    },
};