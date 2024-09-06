# /fatigue

The `/fatigue` slash command allows you to mark 1- or more fatigue for your [active player character](_active-pc.md).

## Alias

The `/f` slash command functions identically to `/fatigue`.

## Options

- `amount` (positive integer): The number of fatigue to mark. Defaults to 1.

## Execution

Momo replies with an error message if there are no player characters associated with your account.

Otherwise, Momo marks fatigue on your active PC equal to the `amount` if provided or 1 if not, to a maximum of 5 total fatigue.

- If the maximum is not exceeded, Momo replies with a confirmation of the new total fatigue.
- If the maximum is exceeded but the PC would not be taken out by conditions, Momo replies prompting you to manually mark conditions equal to the difference.
- If the maximum is exceeded and the PC would be taken out by conditions, Momo automatically marks all the PC’s remaining conditions, and replies with a message that the PC is taken out.
