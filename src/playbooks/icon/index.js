const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Icon')
  .setDefaultStats(0, 1, 1, -1)
  .setBalancePrinciples('Role', 'Freedom')
  .setFeature('Burden & Tradition')
  .setMoves(
    'Use Their Momentum',
    'Bonzu Pippinpaddleopsicopolis… the Third',
    'Concentration',
    'Otter-Penguins, Unagi, and Hot Springs',
    'Yip Yip!'
  );
