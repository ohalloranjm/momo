const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Guardian')
  .setDefaultStats(-1, 1, 0, 1)
  .setBalancePrinciples('Self-Reliance', 'Trust')
  .setFeature("Protector's Burden")
  .setMoves(
    'Suspicious Mind',
    'Badge of Authority',
    'Catch a Liar',
    'Furrowed Brow',
    'Martyr Complex'
  );
