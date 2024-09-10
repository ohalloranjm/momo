const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Pillar')
  .setDefaultStats(1, 0, 1, -1)
  .setBalancePrinciples('Support', 'Leadership')
  .setFeature('Squad Leader')
  .setMoves(
    'Understanding Mein',
    "A Warrior's Heart",
    'Out of Uniform',
    'Fighting like Dancing',
    'Taking Care of Business'
  );
