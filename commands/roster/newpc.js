const { SlashCommandBuilder } = require('discord.js');
const { PlayerCharacter } = require('../../database/models/');
const Playbooks = require('../../playbooks');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newpc')
    .setDescription('Create a new Player Character')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription("Your character's name.")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('playbook')
        .setDescription('Choose your playbook.')
        .setRequired(true)
        .addChoices(
          { name: 'The Hammer', value: 'Hammer' },
          { name: 'The Elder', value: 'Elder' },
          { name: 'The Icon', value: 'Icon' },
          { name: 'The Bold', value: 'Bold' }
        )
    )
    .addStringOption(option =>
      option
        .setName('training')
        .setDescription('Choose a bending or non-bending martial training.')
        .setRequired(true)
        .addChoices(
          { name: 'Waterbending', value: 'Waterbending' },
          { name: 'Earthbending', value: 'Earthbending' },
          { name: 'Firebending', value: 'Firebending' },
          { name: 'Airbending', value: 'Airbending' },
          { name: 'Weapons', value: 'Weapons' },
          { name: 'Technology', value: 'Technology' }
        )
    )
    .addStringOption(option =>
      option
        .setName('stat-increase')
        .setDescription('Choose one of your stats to increase by +1 (max. +2).')
        .setRequired(true)
        .addChoices(
          { name: 'Creativity', value: 'Creativity' },
          { name: 'Focus', value: 'Focus' },
          { name: 'Harmony', value: 'Harmony' },
          { name: 'Passion', value: 'Passion' }
        )
    ),
  async execute(interaction) {
    await interaction.deferReply({
      ephemeral: true,
    });

    const { id } = interaction.user;

    const otherPCs = await PlayerCharacter.grab(interaction, { roster: true });

    if (otherPCs.length >= 5 && id !== process.env.ADMIN_ID) {
      return await interaction.followUp(
        'You are allowed a maximum of five player characters per Discord account. Please delete an existing PC before creating a new one.'
      );
    }

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
    });

    const stat = interaction.options.getString('stat-increase');

    if (newPC[stat] === 2) {
      await interaction.followUp(
        `${playbook.name} already has a ${
          stat[0].toUpperCase() + stat.slice(1)
        } of +2, so you can't increase it during character creation. Choose another stat, and manually increase it using the ${[
          'creativity',
          'focus',
          'harmony',
          'passion',
        ]
          .filter(s => s !== stat)
          .map((s, i) => `${i === 2 ? 'or ' : ''}/${s}`)
          .join(', ')} command.`
      );
    } else {
      newPC[stat]++;
    }

    newPC[interaction.options.getString('training')] = true;
    await newPC.save();

    await interaction.followUp('Character successfully created!');

    for (let i = 0; i < otherPCs.length; i++) {
      const PC = otherPCs[i];
      PC.active = false;
      await PC.save();
      console.log(PC);
    }
  },
};
