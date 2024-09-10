const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Successor')
  .setDefaultStats(1, 1, -1, 0)
  .setBalancePrinciples('Tradition', 'Progress')
  .setFeature('A Tainted Past')
  .setMoves(
    'Way of the Future',
    'Black Koala-Sheep',
    'A Life of Regret',
    'Walk this Way',
    'Worldly Knowledge'
  );
