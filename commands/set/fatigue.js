const { SlashCommandBuilder } = require('discord.js')
const { PlayerCharacter } = require('../../database/models');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fatigue')
        .setDescription('Mark fatigue')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Mark 2 or more fatigue at once')
                .setMinValue(1)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const { id } = interaction.user;
        const pc = await PlayerCharacter.findOne({
            attributes: ['id', 'name', 'fatigue', 'conditionA', 'conditionB', 'conditionC', 'conditionD', 'conditionE'],
            where: { 
                userId: id,
                active: true,
            }
        })

        if (!pc) {
            await interaction.followUp('Cannot find a player character associated with this account. Use ``/newpc`` to create one.')
            return;
        }

        const { fatigue: original } = pc;
        let msg = pc.name;
        const mark = interaction.options.getInteger('amount') || 1
    
        const newFatigue = original + mark;
        if (newFatigue > 5) {
            pc.fatigue = 5;
            const spillover = newFatigue - 5;
            if (original >= 5) {
                msg += ` is already at maximum fatigue, so they’re forced to mark ${mark} condition${mark > 1 ? 's' : ''}.`
            } else {
                msg += ` marks ${mark - spillover}-fatigue, bringing them to 5-fatigue, and is forced to mark ${spillover} condition${spillover > 1 ? 's' : ''}.`
            }
            const conditionsMarked = pc.conditionsMarked();
            console.log(conditionsMarked, spillover);
            if (conditionsMarked + spillover > 5) {
                pc.conditionA = true;
                pc.conditionB = true;
                pc.conditionC = true;
                pc.conditionD = true;
                pc.conditionE = true;
                await pc.save();
                msg += ' They’re taken out! Run ``/takenout`` at the end of this combat exchange, or right now if you’re not in an exchange.'
                await interaction.followUp(msg);
                return;
            }
            await pc.save();
            msg += ' Run ``/condition``.';
            await interaction.followUp(msg)
            return;
        }

        pc.fatigue = newFatigue;
        await pc.save();
        await interaction.followUp(`${pc.name} marks ${mark}-fatigue, bringing them to ${newFatigue}-fatigue.`)
        
    }
}