const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models');
const { conditions } = require('../../constants');
require('../../responses');
require('../../functions');

module.exports = {
    alias: 'xc',
    data: new SlashCommandBuilder()
        .setName('clearcondition')
        .setDescription('Clear one or more conditions.')
        .addStringOption(option => 
            option.setName('condition')
                .setDescription('The name of the condition or conditions to mark, space and/or comma separated')
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const pc = await PlayerCharacter.fetch(interaction, { info: ['conditions', 'playbook'] });

        if (!pc) return await interaction.nopc();

        const playbookConditions = pc.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

        const markedConditions = pc.conditionList();

        if (!markedConditions.length) return await interaction.followUp(`${pc.name} has no conditions marked.`);

        const commandString = interaction.options.getString('condition');

        if (!commandString) {

            // send a button per condition, disabled if it's already clear, and await the clicking of those buttons

            const buttons = [];

            playbookConditions.forEach((condition, i) => {
                const button = new ButtonBuilder()
                    .setCustomId(conditions.QUERY[i])
                    .setLabel(condition.capitalize())
                    .setStyle(ButtonStyle.Success)

                if (!markedConditions.includes(condition)) button.setDisabled(true);

                buttons.push(button);
            })

            const row = new ActionRowBuilder();
            row.addComponents(buttons);

            const sendButtons = await interaction.followUp({
                content: 'Click a condition to clear it.',
                components: [ row ]
            })

            const collector = sendButtons.            createMessageComponentCollector({
                componentType: ComponentType.ButtonInteraction,
                time: 5 * 60 * 1000
            })

            collector.on('collect', async i => {
                const conditionKey = i.customId;
                pc[conditionKey] = false;
                await pc.save();
                const idx = conditions.QUERY.indexOf(conditionKey);
                buttons[idx].setDisabled();
                row.setComponents(buttons);
                await interaction.editReply({ components: [row]})
                await i.reply(`${pc.name} clears ${playbookConditions[idx].capitalize()}`)
            });

            return;

        }

        const targetConditions = commandString.betterSplit(', ', ',', ' ');

        let msgArr = [];
        let savePC = false;

        targetConditions.forEach(condition => {
            const lcCondition = condition.toLowerCase();
            if (playbookConditions.includes(lcCondition)) {
                const conditionKey = conditions.QUERY[playbookConditions.indexOf(lcCondition)];
                if (!pc[conditionKey]) {
                    msgArr.push(`* ${pc.name} does not have ${condition.capitalize()} marked. Choose a different condition to clear.`)
                } else {
                    pc[conditionKey] = false;
                    savePC = true;
                    msgArr.push(`* ${pc.name} clears ${condition.capitalize()}!`)
                }
            } else {
                msgArr.push(`* ${condition.capitalize()} is not a valid condition for your playbook.`)
            }
        })

        if (savePC) await pc.save();
        await interaction.followUp(msgArr.join(`\n`));
    }
}