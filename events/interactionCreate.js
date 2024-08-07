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
      if (Array.isArray(command.execute)) {
        let chain = command.execute;
        while (chain.length) {
          const link = chain[0];
          const cb = Array.isArray(link) ? link[0] : link;
          const params = Array.isArray(link) ? link.slice(1) : [];
          await cb(interaction, ...params);
          chain = interaction.breakChain ? [] : chain.slice(1);
        }
      } else {
        await command.execute(interaction);
      }
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    }
  },
};
