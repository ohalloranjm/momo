# /delete-pc

The `/delete-pc` slash command permanently deletes a player character that you've created.

## Options

- `name` (string, required): The case-sensitive name of the player character you want to delete.

## Execution (ephemeral)

Momo will reply with an error message if:

- There are no player characters associated with your account.
- There are PCs associated with your account, but none of them match the name you input.

Otherwise, Momo will delete the character whose name you input and reply with a confirmation.

If they were your [active player character](_active-pc.md), Momo will choose another PC to make active. You’ll get a follow-up reply telling you which of your PCs has been made active, or that there are no more PCs associated with your account.

## Troubleshooting

If Momo tells you a name is invalid when it shouldn’t be, try running [`/pclist`](pclist.md) and copy-paste the target’s name exactly. Be wary of extra spaces or other characters.
