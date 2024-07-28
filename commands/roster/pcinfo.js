const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../db/models');
require('../../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pcinfo')
        .setDescription('Displays information about your active player character.')
        .addBooleanOption(option => 
            option.setName('public')
                .setDescription('Set true if you want other people to see the message, too.')
        ),
    async execute(interaction) {
        await interaction.deferReply({
            ephemeral: !interaction.options.getBoolean('public')
        })

        const { id } = interaction.user;

        const pc = await PlayerCharacter.findOne({
            where: {
                userId: id,
                active: true
            }
        })

        if (!pc) {
            interaction.followUp('There are no player characters associated with this account. Use ``/newpc`` to create one.');
            return;
        }

        const { principles } = pc.getPlaybook()

        interaction.followUp(
`## ${pc.name}, the ${pc.playbook.capitalize()}
${pc.balance.sign()} ${principles[0]} / ${(-pc.balance).sign()} ${principles[1]}
Center: ${pc.center.sign()} / ${(-pc.center).sign()}
${pc.creativity.sign()} Creativity, ${pc.focus.sign()} Focus, ${pc.harmony.sign()} Harmony, ${pc.passion.sign()} Passion

**Training:** ${pc.trainingList(true)}

**${pc.fatigue}** Fatigue | **${pc.conditionList(true)}** Marked | **${pc.growth}** Growth
`
        )
    }

}