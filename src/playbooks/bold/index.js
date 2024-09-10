const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Bold')
  .setDefaultStats(1, 1, 0, -1)
  .setBalancePrinciples('Loyalty', 'Confidence')
  .setFeature('Legacy of Excellence')
  .setMoves(
    'Best Friend',
    "Here's the Plan",
    'Not Done Yet!',
    'You Missed Something',
    'Straight Shooter'
  );
