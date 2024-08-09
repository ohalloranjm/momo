# /changestat

The `/changestat` slash command changes one of your [active player character](../active-pc.md)’s stats.

## Options

- `stat` (string selection, required): The stat you want to change (Creativity, Focus, Harmony, or Passion).
- `new-value` (integer between -1 and 3 inclusive, required): The new value of the chosen stat.

## Execution (ephemeral)

Momo will reply with an error message if:

- There are no player characters associated with your account.
- You attempt to set a stat to its existing value.

Otherwise, Momo will change the selected stat to the value provided and reply with a confirmation of the change.
