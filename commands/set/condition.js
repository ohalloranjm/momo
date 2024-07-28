const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../db/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('condition')
        .setDescription('Mark one or more conditions'),
    async execute(interaction) {
        const { id } = interaction.user;
        const pc = await PlayerCharacter.findOne({
            attributes: ['id', 'conditionA', 'conditionB']
        })
    } 
}