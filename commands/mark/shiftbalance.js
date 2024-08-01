const { PlayerCharacter } = require('../../database/models');
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    alias: 'b',
    data: new SlashCommandBuilder()
        .setName('shiftbalance')
        .setDescription('Shift your balance.')
        .addStringOption(option => 
            option.setName('principle')
                .setDescription('The principle or direction to shift your balance toward.')
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const pc = await PlayerCharacter.fetch(interaction, {
            info: 'balance'
        })
        await interaction.followUp(`Your balance is ${pc.balance}, your center is ${pc.center}, and your playbook is The ${pc.playbook.capitalize()}`);
    }
}