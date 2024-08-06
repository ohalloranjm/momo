const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Test embed')
    .addStringOption(option =>
      option.setName('name').setDescription('name test')
    )
    .addStringOption(option =>
      option.setName('description').setDescription('description test')
    ),
  async execute(interaction) {
    await interaction.reply('Pong!');
  },
};
