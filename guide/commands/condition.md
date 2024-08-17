# /condition

The `/condition` slash command allows you to mark conditions for your [active player character](../active-pc.md).

## Alias

The `/c` slash command functions identically to `/condition`.

## Options

- `conditions` (string): The case-insensitive condition or conditions to mark. If more than one condition is provided, they can be separated by spaces, commas, or both (`, `).

## Execution

Momo replies with an error message if there are no player characters associated with your account.

Otherwise, Momo’s response depends on whether the `conditions` option is provided.

If the option is provided, Momo attempts to mark each condition on your active PC. At the end of this process, Momo replies with a bulleted list describing the results; each condition is either:

- Successfully marked
- Already marked
- Not a valid condition for your playbook

If the `conditions` option is not provided, Momo ephemerally replies with a set of buttons, one for each condition. Buttons are disabled for conditions already marked on your active PC. Each time you press a button, Momo marks the condition on your active PC, disables the button, and follows up with a confirmation message. The buttons are live for 5 minutes, after which they stop working.
