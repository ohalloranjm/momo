# /newpc

The `/newpc` slash command creates a new player character (PC) and makes it your [active character](../active-pc.md).

## Options

- `name` (string, required): The name of your new character. Cannot be identical to any of your existing characters’ names.

## Execution (ephemeral)

If you’ve already created the maximum of five player characters, Momo will prompt you to [delete one](delete-pc.md) and try again.

If you already have a player character with the chosen name, Momo will tell you to pick a different one.

Otherwise, Momo will walk you through the process of creating a new character.

1. Choose a playbook. This will also determine your starting stats, balance principles, and (if you choose the Elder) the conditions you can mark.
2. Choose a training.
3. Choose a stat to increase by +1, to a maximum of +2. If your playbook comes with a stat already set to +2, the button for that stat will be disabled.

Each of these steps has a timeout associated with it (5m for the first step, then 2m each for the next two steps). If any time window is exceeded, you’ll get a timeout message, and you’ll need to run the command again and start over.

Once you choose a stat to increase, Momo will save your PC to its database. You’ll get a message saying that your character was created successfully. The newly created PC will now be your active PC.
