const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../db/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('switch-pc')
        .setDescription('Change your active PC to a different PC')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('The name of the player character you’d like to switch to.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { id } = interaction.user;
        const roster = await PlayerCharacter.findAll({ where: { userId: id }, attributes: ['id', 'name', 'active']});

        if (!roster.length) {
            await interaction.reply('There are no player characters associated with your account. Use ``/newpc`` to create a character.')
            return;
        }

        const name = interaction.options.getString('name');
        const newActive = roster.find(pc => pc.name === name);

        if (!newActive) {
            await interaction.reply('There are no player characters with that name associated with your account. Use ``/pclist`` to show a list of your characters; please note that names are case-sensitive.')
            return;
        }

        const formerActive = roster.find(pc => pc.active);

        if (formerActive.name === newActive.name) {
            await interaction.reply(`${name} is already your active character!`)
            return;
        }

        formerActive.active = false;
        await formerActive.save();
        newActive.active = true;
        await newActive.save();

        await interaction.reply(`${name} is now your active character.`)

    }
}