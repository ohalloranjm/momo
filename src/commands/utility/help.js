const { SlashCommandBuilder } = require('discord.js');

const blueprint = [
  { content: 'Momo accepts the following slash commands.' },
  { prepend: '##', content: 'Creating & Managing Player Characters' },
  { slash: 'newpc', content: 'Create a new player character.' },
  { slash: 'pclist', content: 'List all of your created PCs.' },
  { slash: 'pcinfo', content: 'Display all information about your active PC.' },
  {
    slash: 'delete-pc',
    content: 'Delete a player character from your account.',
  },
  {
    slash: 'changestat',
    content: 'Change your active PC’s Creativity, Harmony, Focus, or Passion.',
  },
  { slash: 'changename', content: 'Change your active PC’s name.' },
  {
    slash: 'newtraining',
    content:
      'Add a new training to your active PC, or replace their existing trainings.',
  },
  { prepend: '##', content: 'Rolling Moves' },
  { prepend: '###', content: 'Basic Moves' },
  { slash: 'assess', content: 'Asses a Situation' },
  { slash: 'guide', content: 'Guide and Comfort Someone' },
  { slash: 'intimidate', content: 'Intimidate an NPC' },
  { slash: 'plead', content: 'Plead with an NPC' },
  { slash: 'push', content: 'Push Your Luck' },
  { slash: 'rely', content: 'Rely on Your Skills & Training' },
  { slash: 'trick', content: 'Trick an NPC' },
  { prepend: '###', content: 'Balance Moves' },
  { slash: 'callout', content: 'Call Someone Out' },
  { slash: 'deny', content: 'Deny a Callout' },
  { slash: 'resist', content: 'Resist Shifting Your Balance' },
  { prepend: '###', content: 'Stance Move' },
  { slash: 'defend', content: 'Defend & Maneuver' },
  { slash: 'attack', content: 'Advance & Attack' },
  { slash: 'evade', content: 'Evade & Observe' },
  { prepend: '###', content: 'other' },
  { slash: 'training', content: 'Training Move' },
  { prepend: '##', content: 'Fatigue, Conditions, and Balance' },
  { slash: ['condition', 'c'], content: 'Mark one or more conditions.' },
  { slash: ['clearcondition', 'xc'], content: 'Clear one or more conditions.' },
  { slash: ['fatigue', 'f'], content: 'Mark one or more fatigue.' },
  { slash: ['clearfatigue', 'xf'], content: 'Clear one or more fatigue.' },
  { slash: ['shiftbalance', 'b'], content: 'Shift your balance.' },
  { slash: 'resetbalance', content: 'Set your balance to center.' },
  { slash: 'shiftcenter', content: 'Shift your center of balance.' },
  { prepend: '##', content: 'Info' },
  { slash: 'help', content: 'You are here.' },
  { slash: 'bot', content: 'Info about the bot.' },
];

const message = blueprint
  .map(obj => {
    const { prepend, slash, content } = obj;
    let msg = '';
    if (prepend) {
      msg += `${prepend} `;
    } else if (typeof slash === 'string') {
      msg += '* ``/' + slash + '``: ';
    } else if (slash) {
      msg += '* ``/' + slash[0] + '`` or ``/' + slash[1] + '``: ';
    }

    msg += content;

    return msg;
  })
  .join('\n');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Library of options for the operation of Momo bot.')
    .addBooleanOption(option =>
      option
        .setName('public')
        .setDescription(
          'Set true if you want other people to see the help directory, too.'
        )
    ),
  async execute(interaction) {
    await interaction.reply({
      content: message,
      ephemeral: !interaction.options.getBoolean('public'),
    });
  },
};
