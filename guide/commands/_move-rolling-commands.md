# Move-Rolling Slash Commands

Move-rolling commands mostly follow the same template: simulate a 2d6 die roll, apply relevant stats and penalties from your [active player character](../active-pc.md), and display the result.

## Template

### Options

- **`extra-modifier`** (integer): Adds the provided integer to the roll, in addition to your stat modifier and condition penalties. Ignored if `override-modifier` option is input.
- **`alt-stat`** (string selection): Replace this move’s normal stat modifier with one of the following. Ignored if `override-modifier` is input or if you have no active PC.
  - `Live up to Your Balance Principle`: Roll with the greater of your two balance princples instead.
    - You must [mark fatigue manually](fatigue.md).
    - To live up to a negative principle, you must use `override-modifier` instead.
  - `Creativity`, `Focus`, `Harmony`, or `Passion`: Roll with the chosen stat instead.
  - `Conditions Marked`: Roll +1 for each condition you have marked instead.
- **`override-modifier`** (integer): Manually sets the total modifier. If provided, it is the only modifier applied to the die roll; your PC’s stats and condition penalties, and even your `extra-modifier` or `alt-stat` inputs, are ignored.

### Execution

Momo simulates rolling two six-sided dice and sums the results. The total is then modified in the following ways:

1. If an `override-modifier` option was input, Momo adds it to the total and skips steps 2-4.
2. If there’s a player character associated with your account, your active PC’s relevant stat modifier—either the `alt-stat` option or, if that wasn’t provided, the default stat associated with the move—is added to the total.
3. If your active PC has a relevant condition marked, that condition modifier is added to the total.
4. The `extra-modifier` option is added to the total, if one was provided.
5. If the sum of the modifiers from all previous steps is greater than 4, the final total is set to the dice result + 4. If it’s less than -3, the final total is set to the dice result - 3.

Momo then responds with an embed showing the total, how it was calculated, and a message (if one exists) corresponding to the result of the move.

## Commands That Follow the Template Exactly

- `/assess`: Assess a Situation
- `/attack`: Stance Move (Adavnce & Attack)
- `/defend`: Stance Move (Defend & Maneuver)
- `/guide`: Guide and Comfort Someone
- `/intimidate`: Intimidate an NPC
- `/plead`: Plead with an NPC
- `/push`: Push Your Luck
- `/rely`: Rely on Your Skills & Training
- `/trick`: Trick an NPC

## Commands That Diverge from the Template

The following commands differ from the template in the specific listed ways.

### /roll

The `/roll` command is not tied to any specific move, will not automatically apply stat or condition penalties, and doesn’t have a more specific output message than "Hard hit" / "Partial hit" / "Miss." Its options are `stat` and `modifier`, which function as `alt-stat` and `extra-modifier` respectively.

### /evade

The `/evade` command, for the Evade & Observe stance move, uses the greater of your active PC’s Creativity _or_ Harmony during step 2.

### /deny

The `/deny` command, for the Deny a Callout balance move, replaces the `alt-stat` option with a `principle` option (string): the case-insensitive balance principle you’re being called out on.

Momo responds with an error message if you have a player character but input a `principle` that does not match either of your active PC’s balance principles.

If you have a PC and provide neither a `principle` nor `override-modifier` option, Momo ephemerally prompts you to choose one of your active PC’s balance principles. These buttons have a timer of 1 minute; if you don't pick one within that time, Momo replies with a timeout error and the whole execution is canceled.

Instead of the normal step 2, Momo adds the balance principle you chose (whether by inputting a `principle` or clicking a button).

### /callout, /resist, and /training

The `/callout`, `/resist`, and `/training` commands—for the Call Someone Out, Resist Shifting Your Balance, and training moves, respectively—instead of the normal options, each take only a single `modifier` option (integer): a number to add or subtract in addition to condition penalties.

Instead of following the normal steps 1-5, the dice total is modified as follows:

1. The `modifier` option is added to the total, if one was provided.
2. If your active PC has a relevant condition marked, that condition modifier is added to the total.
3. If the sum of the modifiers from steps 1-2 is greater than 4, the final total is set to the dice result + 4. If it’s less than -3, the total is set to the dice result - 3.
