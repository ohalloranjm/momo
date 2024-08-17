# /clearfatigue

The `/clearfatigue` slash command allows you to clear 1- or more fatigue from your [active player character](../active-pc.md).

## Alias

The `/xf` slash command functions identically to `/clearfatigue`.

## Options

- `amount` (integer between 1 and 5): The number of fatigue to clear. Defaults to 1.

## Execution

Momo replies with an error message if:

- There are no player characters associated with your account.
- Your active PC has no fatigue marked.

Otherwise, Momo clears fatigue from your active PC equal to the `amount` if provided or 1 if not, to a minimum of 0 total fatigue, and responds with a confirmation of the PC’s new total fatigue.
