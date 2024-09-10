const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Idealist')
  .setDefaultStats(0, -1, 1, 1)
  .setBalancePrinciples('Forgiveness', 'Action')
  .setFeature('Never Turn My Back')
  .setMoves(
    'The Strength of Your Heart',
    'Whatever I Can',
    'Your Rules Stink',
    "It Doesn't Belong to You!",
    "Can't Knock Me Down"
  );
