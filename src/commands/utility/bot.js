const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Information about Momo.'),
    async execute(interaction) {
        await interaction.reply({
            content: "Momo is an assistive bot for running *Avatar Legends: The Roleplaying Game* via Discord. Run ``/help`` for a list of commands.\n\nMomo is fan-made, affiliated with neither Magpie Games nor the Avatar Legends franchise. His source code contains no game content except that which is already free and public facing. Nobody profits off Momo.",
            ephemeral: true
        }
        )
    }
}