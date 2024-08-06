const { Move } = require('../../classes');

const guide = new Move('guide')
  .setTitle('Guide and Comfort')
  .setStat('Harmony')
  .addConditionModifier('Angry')
  .addConditionModifier('Shaken')
  .appendToResult('hit', 'They choose one:')
  .appendToResult(
    'bullet',
    'hit',
    'They embrace your guidance and comfort. They may clear a condition or 2-fatigue, and you may ask one question; they must answer honestly.'
  )
  .appendToResult('full', 'You may also shift their balance.')
  .appendToResult(
    'bullet',
    'hit',
    'They shut you down. They inflict a condition on you, and you shift their balance in response.'
  );

module.exports = {
  data: guide.command(),
  execute: guide.respond.bind(guide),
};
