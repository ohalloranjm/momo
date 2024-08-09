# Momo

**Momo** is a fan-made assisstive Discord bot for [_Avatar Legends: The Roleplaying Game_](https://magpiegames.com/pages/avatarrpg). He’ll track your stats and roll your dice so you can focus less on calculating modifiers and more on telling an awesome story with your friends.

## Installation

Forthcoming.

## Features

Momo will help you:

- Create and edit player characters, choosing from any of the core playbooks, or from any _Wan Shi Tong’s Adventure Guide_ or _Republic City Setting Toolkit_ playbook.
- Track fatigue, conditions, balance shifts, and center-of-balance shifts.
- Roll basic, balance, stance, and training moves. Stat modifiers and condition penalties are automatically applied, but can be overriden.

He’ll also apply the Elder playbook’s alternate conditions.

### Planned Features

_Although Momo’s core functionality is great, he has a lot to learn before he’s ready to ~~save anyone~~ be a suitable replacement for a character sheet._

Features not yet supported include:

- Playbook moves
- Most playbook spceial features (the Elder’s conditions are the exception)
- Combat techniques[^1]
- Combat statuses
- Growth and advancement
- Moments of Balance
- Creating and managing NPCs
- A searchable rules dictionary

Other fun, but not strictly necessary, planned features include:

- Image icons for player characters
- A random name generator, filterable by gender and nation
- Other random generators, such as adventure hooks, NPCs, and phaseses of the moon

## Slash Commands

Momo works primarily by listening for specific slash commands. See also [Discord’s guide to slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ).

### Create & Manage Player Characters

Each Discord account may have up to five player characters (PCs).

- `/newpc`: Create a new player character and set it to active.
- `/pclist`: List all of your created PCs.
- `/switchpc`: Change your active PC to a different PC you’ve already created.
- `/pcinfo`: Display all information about your active PC.
- `/delete-pc`: Delete a player character from your account.

### Rolling Moves

These commands work best after you create a character: they will automatically pull any relevant stats from your active PC. They still work if you have no PCs; you just need to manually set your modifiers.

- `/assess`: Assess a Situation
- `/guide`: Guide and Comfort Someone
- `/intimidate`: Intimidate an NPC
- `/plead`: Plead with an NPC
- `/push`: Push Your Luck
- `/rely`: Rely on Your Skills & Training
- `/trick`: Trick an NPC
- `/callout`: Call Someone Out
- `/deny`: Deny a Callout
- `/resist`: Resist Shifting Your Balance
- `/stance`: stance move
- `/training`: training move

### Marking Fatigue and Conditions

- `/c` or `/condition`: Mark one or more conditions.
- `/f` or `/fatigue`: Mark one or more fatigue.

## Disclaimers

Momo is fan-made, affiliated with neither Magpie Games nor the Avatar Legends franchise. His source code contains no game pieces except those which are already free and public facing. Nobody profits off Momo.

[^1]: To avoiding including paywalled content, only basic and playbook techniques will be hard-coded into Momo. That said, planned support for _custom_ techniques will let players.
[^2]: As mentioned above, paywalled content will not be included.
