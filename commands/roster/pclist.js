const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../db/models');
require('../../formatters');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('pclist')
        .setDescription('Lists your player characters.'),

    async execute(interaction) {
        const { id } = interaction.user;
        const playerCharacters = await PlayerCharacter.findAll({
            attributes: ['name', 'playbook', 'active'],
            where: { userId: id }
        })
        await interaction.reply(playerCharacters.map(pc => `* ${pc.name}: The ${pc.playbook.capitalize()}${pc.active ? ' [active PC]' : ''}`).join('\n'))
    }
}