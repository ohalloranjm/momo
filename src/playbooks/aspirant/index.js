const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Aspirant')
  .setDefaultStats(-1, 0, 1, 1)
  .setBalancePrinciples('Legacy', 'Adoration')
  .setFeature('Building a Better Future')
  .setMoves(
    'Pink Aura',
    'Always on the Move',
    'Honesty in Pain',
    'Helping Hand',
    'Are They Kind of Cute?'
  );
