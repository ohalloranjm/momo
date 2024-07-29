const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
require('../../functions/getPC');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-pc')
        .setDescription('Permanently delete a player character.')
        .addStringOption(option => 
            option.setName('name')
                .setDescription('The name of the PC you want to delete.')
                .setRequired(true)
        ),
    async execute(interaction) {
        
        const roster = await interaction.getPC({ roster: true });

        const { length } = roster;

        if (!length) {
            await interaction.reply({
                content: 'There are no player characters associated with your account, thus nothing to delete.',
                ephemeral: true,
            });
            return;
        }

        const toDelete = roster.find(pc => pc.name === name)

        if (!toDelete) {
            await interaction.reply({
                content: `Could not find a player character named ${name} associated with your account.`,
                ephemeral: true
            })
            return;
        }

        await toDelete.destroy();
        await interaction.reply({
            content: `Goodbye, ${name}.`,
            ephemeral: true,
        });

        if (length > 1) {
            const nextActive = roster.find(pc => pc.name !== name);
            nextActive.active = true;
            await nextActive.save();
            await interaction.followUp({
                content: `${nextActive.name} is now your active PC.`,
                ephemeral: true
            })
        } else {
            await interaction.followUp(
                {
                    content: 'There are no more player characters associated with your account. Use ``/newpc`` to create one; otherwise, use the ``extra-modifier`` or ``override`` option on roll commands to manually set your roll modifiers.',
                    ephemeral: true
            })
        }
    }
}