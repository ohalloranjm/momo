# /shiftbalance

The `/shiftbalance` slash command allows you to shift your [active player character](../active-pc.md)’s balance.

## Alias

The `/b` slash command functions identically to `/shiftbalance`.

## Options

- `principle` (string): The principle to shift toward. Valid inputs are:
  - Either of your active PC’s case-insensitive principles
  - `left` or `-1`, representing the principle on the left of the PC’s balance track
  - `right` or `1`, representing the principle on the right side of the PC’s track
  - `away`, representing whichever principle would bring the PC further from center (not valid if the PC is currently at their center)
  - `center`, representing whichever principle would bring the PC closer to center

## Execution

Momo replies with an error message if there are no player characters associated with your account.

Otherwise, Momo’s response depends on whether you provided a valid `principle` option.

If you didn’t provide a valid option (whether by entering an invalid option or by not entering any), Momo prompts[^1] you to choose one of your active PC’s balance principles. These buttons have a timer of 1 minute; if you don’t choose a principle before then, Momo replies with a timeout message, and the execution is canceled.

Momo then attempts to shift your active PC’s balance one step toward the principle you chose (whether by providing a valid `principle` option or clicking a button), and replies with one of the following:

- If the shifted-toward principle is already +3, Momo informs you that your active PC might have _lost their balance_ and provides instructions on how to manually execute the results of a _lose your balance_ move.
- If you input a `principle` option of `center` and your active PC is already at center, Momo informs you you of this.
- Otherwise, Momo replies with a confirmation of your active PC’s new balance.

[^1]: The prompt is ephemeral only if you didn’t enter any `principle` option.
