const Playbook = require('../../classes/playbook');

module.exports = new Playbook('Rogue')
  .setDefaultStats(1, 0, -1, 1)
  .setBalancePrinciples('Friendship', 'Survival')
  .setFeature('Bad Habits')
  .setMoves(
    'Roguish Charm',
    'Slippery Eel-Hound',
    "You're Not My Master!",
    'Casing the Joint',
    'Is That the Best You Got?'
  );
