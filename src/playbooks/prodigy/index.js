const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Prodigy')
  .setDefaultStats(-1, 2, 0, 0)
  .setBalancePrinciples('Excellence', 'Community')
  .setFeature('Extraordinary Skill')
  .setMoves(
    'Judging a Rival',
    'An Open Mind',
    'Wait and Listen',
    'Challenge',
    'Surprising Entrance'
  );
