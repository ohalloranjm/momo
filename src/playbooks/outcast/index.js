const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Outcast')
  .setDefaultStats(2, -1, 0, 0)
  .setBalancePrinciples('Society', 'Integrity')
  .setFeature('Life on the Outside')
  .setMoves(
    'Picking Up Skills',
    'Stories of the World',
    'Fast Learner',
    'High-Risk High-Reward',
    'Watchful Fighter'
  );
