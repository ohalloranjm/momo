const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      const { cooldowns } = interaction.client;

      const now = Date.now();
      const cooldownAmount = 1000;

      if (cooldowns.has(interaction.user.id)) {
        const expirationTime =
          cooldowns.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          return interaction.reply({
            content: `Hold on! You're limited to one Momo command per second.`,
            ephemeral: true,
          });
        }
      }

      cooldowns.set(interaction.user.id, now);
      setTimeout(() => cooldowns.delete(interaction.user.id), cooldownAmount);

      try {
        await command.execute(interaction);
      } catch (err) {
        let content;

        if (err.code === 'InteractionCollectorError') {
          content = 'Timed out';
        } else {
          console.error(err);
          content = 'There was an error while executing this command!';
        }

        try {
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
        } catch (err) {
          console.error(
            `Interaction incorrectly parsed, resulting in error: ${err}`
          );
        }
      }
    } else if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      try {
        await command.autocomplete(interaction);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
