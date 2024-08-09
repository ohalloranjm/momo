# /switchpc

The `/switchpc` slash command changes your [active player character](../active-pc.md) to a different PC associated with your account.

## Options

- `name` (string, required): The case-sensitive name of the player character you want to make active.

## Execution (ephemeral)

Momo will reply with an error message if:

- There are no player characters associated with your account.
- There are PCs associated with your account, but none of them match the name you input.
- You input the name of your currently active PC.

Otherwise, Momo will make your current active PC inactive, and the selected PC active, and reply with confirmation of the switch.

## Troubleshooting

If Momo tells you a name is invalid when it shouldn’t be, try running [`/pclist`](pclist.md) and copy-paste the target’s name exactly. Be wary of extra spaces or other characters.
