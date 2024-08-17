const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST().setToken(process.env.TOKEN);

rest
  .delete(
    Routes.applicationGuildCommand(
      process.env.CLIENT_ID,
      process.env.GUILD_ID,
      process.env.DELETE_COMMAND_ID
    )
  )
  .then(() => console.log('Successfully deleted guild command'))
  .catch(console.error);
