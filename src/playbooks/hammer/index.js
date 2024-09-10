const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Hammer')
  .setDefaultStats(1, -1, 0, 1)
  .setBalancePrinciples('Force', 'Care')
  .setFeature('Bringing Them Down')
  .setMoves(
    'Fueled by Anger',
    "Walls Can't Hold Me",
    'Punch Where It Matters',
    'Comprehend Your Foe',
    'Stand and Fight!'
  );
