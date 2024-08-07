const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);

      const content =
        err.code === 'InteractionCollectorError'
          ? 'Timed out'
          : 'There was an error while executing this command!';

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content,
          ephemeral: true,
        });
      }
    }
  },
};
