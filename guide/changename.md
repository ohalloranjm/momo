# /changename

The `/changename` slash command changes your [active player character](_active-pc.md)’s name.

## Options

- `new-name` (string, required): The name you want to change to.

## Execution (ephemeral)

Momo will reply with an error message if:

- There are no player characters associated with your account.
- You input a name already in use by another of your PCs.
- You input your active PC’s current name.

Otherwise, Momo will change your active PC’s name to the value provided and reply with a confirmation of the change.
