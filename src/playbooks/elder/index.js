const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Elder')
  .setDefaultStats(0, 0, 2, -1)
  .setBalancePrinciples('Experience', 'Humility')
  .setFeature('Wisdom of the Ages')
  .setMoves(
    "As Long As I'm Breathing",
    "Life's True Delights",
    'Around Here Somewhere',
    'Cut the Garbage',
    'An Open Heart'
  );
