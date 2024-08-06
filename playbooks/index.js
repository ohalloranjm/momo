const Playbook = require('../classes/playbook');

module.exports = {
  adamant: new Playbook('Adamant')
    .setDefaultStats(0, 1, -1, 1)
    .setBalancePrinciples('Restraint', 'Results'),
  adrift: new Playbook('Adrift')
    .setDefaultStats(2, 0, 0, -1)
    .setBalancePrinciples('Risk', 'Stability'),
  aspirant: new Playbook('Aspirant')
    .setDefaultStats(-1, 0, 1, 1)
    .setBalancePrinciples('Legacy', 'Adoration'),
  bold: new Playbook('Bold')
    .setDefaultStats(1, 1, 0, -1)
    .setBalancePrinciples('Loyalty', 'Confidence'),
  destined: new Playbook('Destined')
    .setDefaultStats(0, -1, 2, 0)
    .setBalancePrinciples('Patience', 'Determination'),
  elder: new Playbook('Elder')
    .setDefaultStats(0, 0, 2, -1)
    .setBalancePrinciples('Experience', 'Humility'),
  foundling: new Playbook('Foundling')
    .setDefaultStats(1, -1, 1, 0)
    .setBalancePrinciples('Unity', 'Heritage'),
  guardian: new Playbook('Guardian')
    .setDefaultStats(-1, 1, 0, 1)
    .setBalancePrinciples('Self-Reliance', 'Trust'),
  hammer: new Playbook('Hammer')
    .setDefaultStats(1, -1, 0, 1)
    .setBalancePrinciples('Force', 'Care'),
  icon: new Playbook('Icon')
    .setDefaultStats(0, 1, 1, -1)
    .setBalancePrinciples('Role', 'Freedom'),
  idealist: new Playbook('Idealist')
    .setDefaultStats(0, -1, 1, 1)
    .setBalancePrinciples('Forgiveness', 'Action'),
  outcast: new Playbook('Outcast')
    .setDefaultStats(2, -1, 0, 0)
    .setBalancePrinciples('Society', 'Integrity'),
  pillar: new Playbook('Pillar')
    .setDefaultStats(1, 0, 1, -1)
    .setBalancePrinciples('Support', 'Leadership'),
  prodigy: new Playbook('Prodigy')
    .setDefaultStats(-1, 2, 0, 0)
    .setBalancePrinciples('Excellence', 'Community'),
  razor: new Playbook('Razor')
    .setDefaultStats(0, 2, -1, 0)
    .setBalancePrinciples('Control', 'Connection'),
  rogue: new Playbook('Rogue')
    .setDefaultStats(1, 0, -1, 1)
    .setBalancePrinciples('Friendship', 'Survival'),
  successor: new Playbook('Successor')
    .setDefaultStats(1, 1, -1, 0)
    .setBalancePrinciples('Tradition', 'Progress'),
};
