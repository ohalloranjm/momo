const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Destined')
  .setDefaultStats(0, -1, 2, 0)
  .setBalancePrinciples('Patience', 'Determination')
  .setFeature('Marked by Fate')
  .setMoves(
    'Call from Afar',
    'Eyes of the Soul',
    'Peacemaker',
    "More than Fate's Playthings",
    'Echoes of Legend'
  );
