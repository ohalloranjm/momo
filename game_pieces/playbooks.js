const Playbook = require('../classes/playbook');

module.exports = {
    adamant: new Playbook('adamant')
        .setDefaultStats(0, 1, -1, 1)
        .setBalancePrinciples('Restraint', 'Results'),
    adrift: new Playbook('adrift')
        .setDefaultStats(2, 0, 0, -1)
        .setBalancePrinciples('Risk', 'Stability'),
    aspirant: new Playbook('aspirant')
        .setDefaultStats(-1, 0, 1, 1)
        .setBalancePrinciples('Legacy', 'Adoration'),
    bold: new Playbook('bold')
        .setDefaultStats(1, 1, 0, -1)
        .setBalancePrinciples('Loyalty', 'Confidence'),
    destined: new Playbook('destined')
        .setDefaultStats(0, -1, 2, 0)
        .setBalancePrinciples('Patience', 'Determination'),
    elder: new Playbook('elder')
        .setDefaultStats(0, 0, 2, -1)
        .setBalancePrinciples('Experience', 'Humility'),
    foundling: new Playbook('foundling')
        .setDefaultStats(1, -1, 1, 0)
        .setBalancePrinciples('Unity', 'Heritage'),
    guardian: new Playbook('guardian')
        .setDefaultStats(-1, 1, 0, 1)
        .setBalancePrinciples('Self-Reliance', 'Trust'),
    hammer: new Playbook('hammer')
        .setDefaultStats(1, -1, 0, 1)
        .setBalancePrinciples('Force', 'Care'),
    icon: new Playbook('icon')
        .setDefaultStats(0, 1, 1, -1)
        .setBalancePrinciples('Role', 'Freedom'),
    idealist: new Playbook('idealist')
        .setDefaultStats(0, -1, 1, 1)
        .setBalancePrinciples('Forgiveness', 'Action'),
    outcast: new Playbook('outcast')
        .setDefaultStats(2, -1, 0, 0)
        .setBalancePrinciples('Society', 'Integrity'),
    pillar: new Playbook('pillar')
        .setDefaultStats(1, 0, 1, -1)
        .setBalancePrinciples('Support', 'Leadership'),
    prodigy: new Playbook('prodigy')
        .setDefaultStats(-1, 2, 0, 0)
        .setBalancePrinciples('Excellence', 'Community'),
    razor: new Playbook('razor')
        .setDefaultStats(0, 2, -1, 0)
        .setBalancePrinciples('Control', 'Connection'),
    rogue: new Playbook('rogue')
        .setDefaultStats(1, 0, -1, 1)
        .setBalancePrinciples('Friendship', 'Survival'),
    successor: new Playbook('successor')
        .setDefaultStats(1, 1, -1, 0)
        .setBalancePrinciples('Tradition', 'Progress')
}