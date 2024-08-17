const { Move } = require('../../classes/');

const plead = new Move('plead')
  .setTitle('Plead with an NPC')
  .setStat('Harmony')
  .addConditionModifier('Troubled')
  .addConditionModifier('Jaded')
  .appendToResult(
    'full',
    'They act now and do their best until the situation changes.'
  )
  .appendToResult(
    'part',
    'They need something more—evidence that this is the right course, guidance in making the right choices, or resources to aid them—before they act; the GM tells you what they need.'
  );

module.exports = {
  data: plead.command(),
  execute: plead.respond.bind(plead),
};
