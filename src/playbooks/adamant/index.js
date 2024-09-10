const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Adamant')
  .setDefaultStats(0, 1, -1, 1)
  .setBalancePrinciples('Restraint', 'Results')
  .setFeature('The Loadstar')
  .setMoves(
    'This Was a Victory',
    'Takes One to Know One',
    'No Time for Feelings',
    "I Don't Hate You",
    'Driven by Justice'
  );
