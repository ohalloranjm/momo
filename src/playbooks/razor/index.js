const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Razor')
  .setDefaultStats(0, 2, -1, 0)
  .setBalancePrinciples('Control', 'Connection')
  .setFeature('Making Amends')
  .setMoves(
    'Air-Cutting Edge',
    'Mind of Steel',
    "I'm a People Person",
    'Come and Get It',
    'Winning is Everything'
  );
