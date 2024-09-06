# /pcinfo

The `/pcinfo` slash command displays information about your [active player character](_active-pc.md).

## Options

- `public` (boolean, defaults to `false`): If set to true, Momo’s reply will not be ephemeral, so everyone else in the channel can see your character’s stat block.

## Execution (optionally ephemeral)

Momo will reply with an error message if there are no player characters associated with your account.

Otherwise, Momo will reply with an embed displaying your active PC’s name, playbook, stats, balance principles, current balance, center of balance, marked conditions, marked fatigue, and training.
