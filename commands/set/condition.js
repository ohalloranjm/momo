const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { conditions } = require('../../constants');
require('../../functions');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('condition')
        .setDescription('Mark one or more conditions')
        .addStringOption(option =>
            option.setName('condition')
                .setDescription('The name of the condition to mark')
        ),
    async execute(interaction) {
        await interaction.deferReply();
        
        const pc = await PlayerCharacter.fetch (interaction, {info: [ 'conditions', 'playbook' ]});

        if (!pc) return await interaction.followUp('You have no player characters. ``/newpc`` to create one.')

        const playbookConditions = pc.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

        const commandString = interaction.options.getString('condition');

        if (!commandString) {

            // send a button per condition, disabled if it's chosen, and await the clicking of those buttons

            const alreadyMarked = pc.conditionList();

            const buttons = [];

            playbookConditions.forEach((condition, i) => {
                const button = new ButtonBuilder()
                    .setCustomId(conditions.QUERY[i])
                    .setLabel(condition.capitalize())
                    .setStyle(ButtonStyle.Primary);

                if (alreadyMarked.includes(condition)) {
                    button.setDisabled(true);
                }

                buttons.push(button);
            })
            
            const row = new ActionRowBuilder();
            row.addComponents(buttons);

            const sendButtons = await interaction.followUp({ 
                content: 'Click a condition to mark it.',
                components: [ row ]
            })

            const collector = sendButtons.createMessageComponentCollector({
                componentType: ComponentType.ButtonInteraction,
                time: 5 * 60 * 1000
            })

            collector.on('collect', async i => {
                const conditionKey = i.customId;
                pc[conditionKey] = true;
                await pc.save();
                const idx = conditions.QUERY.indexOf(conditionKey);
                buttons[idx].setDisabled();
                row.setComponents(buttons);
                await interaction.editReply({ components: [row]})
                await i.reply(`${pc.name} marks ${playbookConditions[idx].capitalize()}!`);
            })

            return;
        }

        const targetConditions = commandString.betterSplit(', ', ',', ' ');

        let msgArr = [];
        let savePC = false;

        targetConditions.forEach(condition => {
            const lcCondition = condition.toLowerCase();
            if (playbookConditions.includes(lcCondition)) {
                const conditionKey = conditions.QUERY[playbookConditions.indexOf(lcCondition)]
                console.log('conditionKey', conditionKey);
                if (pc[conditionKey]) {
                    msgArr.push(`* ${pc.name} is already ${condition.capitalize()}. Choose another condition.`)
                } else {
                    pc[conditionKey] = true;
                    savePC = true;
                    console.log('savePC', savePC)
                    msgArr.push(`* ${pc.name} marks ${condition.capitalize()}!`);
                }
            } else {
                msgArr.push(`* ${condition.capitalize()} is not a valid condition for your playbook.`)
            }
        })

        if (savePC) await pc.save();
        interaction.followUp(msgArr.join('\n'));
        
    } 
}