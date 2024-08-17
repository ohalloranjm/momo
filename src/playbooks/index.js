const Playbook = require('../classes/playbook');

module.exports = {
  Adamant: new Playbook('Adamant')
    .setDefaultStats(0, 1, -1, 1)
    .setBalancePrinciples('Restraint', 'Results'),
  Adrift: new Playbook('Adrift')
    .setDefaultStats(2, 0, 0, -1)
    .setBalancePrinciples('Risk', 'Stability'),
  Aspirant: new Playbook('Aspirant')
    .setDefaultStats(-1, 0, 1, 1)
    .setBalancePrinciples('Legacy', 'Adoration'),
  Bold: new Playbook('Bold')
    .setDefaultStats(1, 1, 0, -1)
    .setBalancePrinciples('Loyalty', 'Confidence'),
  Destined: new Playbook('Destined')
    .setDefaultStats(0, -1, 2, 0)
    .setBalancePrinciples('Patience', 'Determination'),
  Elder: new Playbook('Elder')
    .setDefaultStats(0, 0, 2, -1)
    .setBalancePrinciples('Experience', 'Humility'),
  Foundling: new Playbook('Foundling')
    .setDefaultStats(1, -1, 1, 0)
    .setBalancePrinciples('Unity', 'Heritage'),
  Guardian: new Playbook('Guardian')
    .setDefaultStats(-1, 1, 0, 1)
    .setBalancePrinciples('Self-Reliance', 'Trust'),
  Hammer: new Playbook('Hammer')
    .setDefaultStats(1, -1, 0, 1)
    .setBalancePrinciples('Force', 'Care'),
  Icon: new Playbook('Icon')
    .setDefaultStats(0, 1, 1, -1)
    .setBalancePrinciples('Role', 'Freedom'),
  Idealist: new Playbook('Idealist')
    .setDefaultStats(0, -1, 1, 1)
    .setBalancePrinciples('Forgiveness', 'Action'),
  Outcast: new Playbook('Outcast')
    .setDefaultStats(2, -1, 0, 0)
    .setBalancePrinciples('Society', 'Integrity'),
  Pillar: new Playbook('Pillar')
    .setDefaultStats(1, 0, 1, -1)
    .setBalancePrinciples('Support', 'Leadership'),
  Prodigy: new Playbook('Prodigy')
    .setDefaultStats(-1, 2, 0, 0)
    .setBalancePrinciples('Excellence', 'Community'),
  Razor: new Playbook('Razor')
    .setDefaultStats(0, 2, -1, 0)
    .setBalancePrinciples('Control', 'Connection'),
  Rogue: new Playbook('Rogue')
    .setDefaultStats(1, 0, -1, 1)
    .setBalancePrinciples('Friendship', 'Survival'),
  Successor: new Playbook('Successor')
    .setDefaultStats(1, 1, -1, 0)
    .setBalancePrinciples('Tradition', 'Progress'),
};
