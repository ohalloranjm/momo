# Slash Commands

Momo takes the following slash commands.

## Creating & Managing Player Characters

Each Discord account may have up to five player characters. Only one of your PCs is [active PC](./active-pc.md) at any given time.

- [`/newpc`](commands/newpc.md): Create a new player character.
- [`/pclist`](commands/pclist.md): List all of your created PCs.
- [`/switchpc`](commands/switchpc.md): Change your active PC to a different PC you’ve already created.
- [`/pcinfo`](commands/pcinfo.md): Display all information about your active PC.
- [`/delete-pc`](commands/delete-pc.md): Delete a player character from your account.
- [`/change-stat`](commands/changestat.md): Change your active PC’s Creativity, Harmony, Focus, or Passion.

## Rolling Moves

These commands work best after you create a character: they will automatically pull any relevant stats and conditions from your active PC. They still work if you have no PCs; you’ll just need to manually set your modifiers using the `extra-modifier` or `override-modifier` option.

### Basic Moves

- [`/assess`](commands/assess.md): Assess a Situation
- [`/guide`](commands/guide.md): Guide and Comfort Someone
- [`/intimidate`](commands/intimidate.md): Intimidate an NPC
- [`/plead`](commands/plead.md): Plead with an NPC
- [`/push`](commands/push.md): Push Your Luck
- [`/rely`](commands/rely.md): Rely on Your Skills & Training
- [`/trick`](commands/trick.md): Trick an NPC

### Balance Moves

- [`/callout`](commands/callout.md): Call Someone Out
- [`/deny`](commands/deny.md): Deny a Callout
- [`/resist`](commands/resist.md): Resist Shifting Your Balance

To _live up to your balance principle_ on a basic or stance move, set the `alternate-stat` option to `Live up to Your Balance Principle`. Fatigue is not automatically marked.

### Stance Move

- [`/defend`](commands/defend.md): Defend & Maneuver
- [`/attack`](commands/attack.md): Advance & Attack
- [`/evade`](commands/evade.md): Evade & Observe

### Other

- [`/training`](commands/training.md): Training Move

## Fatigue, Conditions, and Balance

- [`/c` or `/condition`](commands/condition.md): Mark one or more conditions.
- [`/xc` or `/clearcondition`](commands/clearcondition.md): Clear one or more conditions.
- [`/f` or `/fatigue`](commands/fatigue.md): Mark one or more fatigue.
- [`/xf` or `/clearfatigue`](commands/clearfatigue.md): Clear one or more fatigue.
- [`/b` or `/balance`](commands/balance.md): Shift your balance.
- [`/resetbalance`](commands/resetbalance.md): Set your balance to center.
- [`/shiftcenter`](commands/shiftcenter.md): Shift your center of balance.

## Info

- [`/help`](commands/help.md): A list of commands.
- [`/bot`](commands/bot.md): Information about Momo.
