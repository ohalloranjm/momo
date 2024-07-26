const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../db/models/');
const Playbooks = require('../../game_pieces/playbooks.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('newpc')
        .setDescription('Create a new Player Character')
        .addStringOption(option => 
            option.setName('name')
                .setDescription("Your character's name.")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('playbook')
                .setDescription('Choose your playbook.')
                .setRequired(true)
                .addChoices(
                    { name: 'The Hammer', value: 'hammer' },
                    { name: 'The Elder', value: 'elder' },
                    { name: 'The Icon', value: 'icon' },
                    { name: 'The Bold', value: 'bold' }
                )
        )
        .addStringOption(option => 
            option.setName('training')
                .setDescription("Choose a bending or non-bending martial training.")
                .setRequired(true)
                .addChoices(
                    { name: 'Waterbending', value: 'waterbending' },
                    { name: 'Earthbending', value: 'earthbending' },
                    { name: 'Firebending', value: 'firebending' },
                    { name: 'Airbending', value: 'airbending' },
                    { name: 'Weapons', value: 'weapons' },
                    { name: 'Technology', value: 'technology' },
                )
        )
        .addStringOption(option => 
            option.setName('stat-increase')
                .setDescription('Choose one of your stats to increase by +1 (max. +2).')
                .setRequired(true)
                .addChoices(
                    { name: 'creativity', value: 'creativity' },
                    { name: 'focus', value: 'focus' },
                    { name: 'harmony', value: 'harmony' },
                    { name: 'passion', value: 'passion' },
                )
        ),
    async execute(interaction) {
        const { id } = interaction.user;

        const otherPCs = await PlayerCharacter.findAll({
            where: {
                userId: id
            },
            attributes: [ 'id', 'active' ]
        })

        if (otherPCs.length > 2) {

            await interaction.reply("You are allowed a maximum of three player characters per Discord account. Please delete an existing PC before creating a new one.")

        } else {

            await interaction.reply('Creating your character!');

            const playbook = Playbooks[interaction.options.getString('playbook')];
            const { creativity, focus, harmony, passion } = playbook;

            const newPC = PlayerCharacter.build({
                userId: interaction.user.id,
                name: interaction.options.getString('name'),
                playbook: interaction.options.getString('playbook'),
                creativity,
                focus,
                harmony,
                passion,
                backgrounds: 'Military, Wilderness',
            })

            const stat = interaction.options.getString('stat-increase');
            
            if (newPC[stat] === 2) {
                await interaction.reply(`${playbook.name} already has a ${stat[0].toUpperCase() + stat.slice(1)} of +2, so you can't increase it during character creation. Choose another stat, and manually increase it using the ${['creativity', 'focus', 'harmony', 'passion'].filter(s => s !== stat).map(s, i => `${i === 2 ? 'or ' : ''}/${s}`).join(', ')} command.`);
            } else {
                newPC[stat]++;
            }

            newPC[interaction.options.getString('training')] = true;
            await newPC.save();

            for (let i = 0; i < otherPCs.length; i++) {
                const PC = otherPCs[i];
                PC.active = false;
                await PC.save();
            }
        }
        }
}