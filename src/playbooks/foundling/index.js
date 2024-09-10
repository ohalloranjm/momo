const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Foundling')
  .setDefaultStats(1, -1, 1, 0)
  .setBalancePrinciples('Unity', 'Heritage')
  .setFeature('Double Heritage')
  .setMoves(
    'Empty Your Mind',
    'Building Bridges',
    'Martial Sensitive',
    'Trusty Talisman',
    'Things in Common'
  );
