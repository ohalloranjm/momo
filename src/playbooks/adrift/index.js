const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Adrift')
  .setDefaultStats(2, 0, 0, -1)
  .setBalancePrinciples('Risk', 'Stability')
  .setFeature('Upsetting the Cabbage Cart')
  .setMoves(
    'Changing Plans',
    'Play the Part',
    'Brooding Mind',
    'Hidden Knives',
    'Drawing Ire'
  );
