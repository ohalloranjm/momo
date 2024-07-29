const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
require('../../functions');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('pclist')
        .setDescription('Lists your player characters.'),

    async execute(interaction) {
        const { id } = interaction.user;
        const roster = await PlayerCharacter.findAll({
            attributes: ['name', 'playbook', 'active'],
            where: { userId: id }
        })

        if(!roster.length) return await interaction.reply('You have no PCs')

        await interaction.reply(roster.map(pc => `* ${pc.name}: The ${pc.playbook.capitalize()}${pc.active ? ' [active PC]' : ''}`).join('\n'))
    }
}