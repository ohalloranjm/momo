const { REST, Routes } = require('discord.js');
require('dotenv').config();
const { NODE_ENV, TOKEN, CLIENT_ID, GUILD_ID, COMMAND_ID } = process.env;

const global = NODE_ENV === 'production';

const rest = new REST().setToken(TOKEN);

if (COMMAND_ID === 'delete_all') {
  const route = global
    ? Routes.applicationCommands(CLIENT_ID)
    : Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID);

  rest
    .put(route, { body: [] })
    .then(() =>
      console.log(
        `Successfully deleted all ${global ? 'application' : 'guild'} commands.`
      )
    )
    .catch(console.error);
} else {
  const route = global
    ? Routes.applicationCommand(CLIENT_ID, COMMAND_ID)
    : Routes.applicationGuildCommand(CLIENT_ID, GUILD_ID, COMMAND_ID);

  rest
    .delete(route)
    .then(() =>
      console.log(
        `Successfully deleted ${global ? 'application' : 'guild'} command`
      )
    )
    .catch(console.error);
}
