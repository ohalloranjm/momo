# /shiftcenter

The `/shiftcenter` slash command allows you to shift your [active player character](_active-pc.md)’s center of balance.

## Options

- `principle` (string): The case-insensitive principle to shift toward.

## Execution

Momo replies with an error message if:

- There are no player characters associated with your account.
- You provide an invalid `principle` option. (Note that this command is more restrictive than [/shiftbalance](shiftbalance.md).)

Otherwise, Momo attempts to shift your center toward the `principle` you input.

If you didn’t provide a `principle` option, Momo first ephemerally prompts you to choose one of your active PC’s balance principles. These buttons have a timer of 1 minute; if you don’t choose a principle before then, Momo replies with a timeout message, and the execution is canceled.

Momo then attempts to shift your active PC’s balance one step toward the principle you chose (whether through the `principle` option or a button click), and replies with one of the following:

- If the shifted-toward principle is already +3, Momo informs you that he cannot shift the PC’s center off the edge of their balance track.
- If the shifted-toward principle starts at +2 or less, Momo changes the PC’s center and replies with a confirmation of the new center.
