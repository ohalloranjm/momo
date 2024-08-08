const { SlashCommandBuilder } = require('discord.js');

/**
 * 
 * player character manager
 * /newpc -- create new pc, automatically makes active
 * /active -- change active pc
 * /pcinfo -- gives you output for all PCs, or just active
 * /deletepc -- 
 * 
 * basic moves
 * /assess -- assess a situation
 * /guide -- guide and comfort
 * /intimidate -- intimidate an npc
 * /plead -- plead with an npc
 * /push -- push your luck
 * /rely -- rely on your skills and training
 * 
 * balance moves
 * /callout -- call someone out
 * /deny -- deny a callout
 * /resist -- resist shifting your balance
 * 
 * stance moves
 * /attack -- stance move to advance and attack
 * /defend -- stance move to defend and maneuver
 * /evade -- stance move to evade and observe
 * 
 * other moves with rolls
 * /pb -- gives you a list of playbook moves you currently have access to. combine with a code to roll that move
 * /training -- roll the training move
 */

const list = `**Basic Moves**

`

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Library of options for the operation of Momo bot.'),
    async execute(interaction) {
        await interaction.reply({
            content: "I'm doing my best!"
        })
    }

}