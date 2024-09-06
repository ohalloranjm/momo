# /newtraining

The `/newtraining` slash adds a new training to your [active player character](_active-pc.md), or replaces their existing training.

## Options

- `training` (string selection, required): The training to add to your active PC.
- `replace` (boolean): If `true`, removes all your active PC’s existing trainings before adding the new ones.

## Execution (ephemeral)

Momo will reply with an error message if:

- There are no player characters associated with your account.
- You input a `training` that your active PC already has.

Otherwise, Momo will add the selected training to your active PC—if `replace` is true, he will also remove all your active PC’s previous trainings—and reply with a confirmation of the new training(s).
