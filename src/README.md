# Momo

Momo is a [Discord](https://discord.com/) bot for facilitating [_Avatar Legends: The Roleplaying Game_](https://magpiegames.com/pages/avatarrpg). It doubles as a character manager and dice roller.

## Dependencies

Momo uses [discord.js](https://discord.js.org/) to interface with Discord's APIs, and the [Sequelize](https://sequelize.org/) ORM to interface with its own dabatase.

## Setup

To host your own copy of Momo, you’ll need [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), as well as a Discord account.

1. Clone this repo and `cd` into its `/src` directory.
2. Run `npm install` to install dependencies.
3. Create a file named `.env` and populate it according to the [`.env.example`](./.env.example) template.
   - Set `GUILD_ID` to the Discord server you'll use for development and testing.
   - Set `DB_FILE` to your database path. In development, this can be a file within the `/src` directory (e.g. `database/temp.db`).
   - Use the [Discord developer portal](https://discord.com/developers/applications) to create a new bot. Set `CLIENT_ID` to its application ID and `TOKEN` to its secret token.
4. Run `npm run migrate` to initiate your database.
5. Run `npm run register` to register your slash commands with Discord.

To launch Momo, run `node .` or `npm start`. If setup was successful, you'll see the following message in your terminal:

```
Ready! Logged in as <your_bot_name>
```

Momo can now accept and respond to slash commands in the specified server.

Running `npm run dev` instead will start Momo as normal, but automatically restart whenever the source files are changed.

## Managing Slash Commands

If you change existing slash commands or create new slash commands, you will need to run `npm run register` again to register the changes with Discord.

You do _not_ need to re-register your commands if the only thing changing is Momo’s execution of a command (the `execute` property). Only changes to `data` or `alias` properties require re-registration.

### Deleting Commands

To undo a registration for a specific slash command, set the `COMMAND_ID` environment varibale to the ID of that command and run `npm run register:undo`.

To un-register _all_ commands, set `COMMAND_ID=delete_all`.

### Global Deployment

When the `NODE_ENV` environment variable is set to `production`, commands are registered or deleted globally—so that they can be used in any server where Momo is installed.

## Resetting Your Database

To reset your database, run `npm run drop` to delete the existing table, then `npm run migrate` to recreate it. **This will delete all character information in your database.**
