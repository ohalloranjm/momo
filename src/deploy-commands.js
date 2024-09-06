const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const { NODE_ENV, TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
      if ('alias' in command) {
        commands.push(command.data.setName(command.alias).toJSON());
      }
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(TOKEN);
const global = NODE_ENV === 'production';

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands${
        global ? ' globally' : ''
      }.`
    );

    const route = global
      ? Routes.applicationCommands(CLIENT_ID)
      : Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID);

    const data = await rest.put(route, {
      body: commands,
    });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (err) {
    console.error(err);
  }
})();
