const Playbook = require('../classes/playbook');

module.exports = {
    adamant: new Playbook('adamant')
        .setDefaultStats(0, 1, -1, 1),
    adrift: new Playbook('adrift')
        .setDefaultStats(2, 0, 0, -1),
    aspirant: new Playbook('aspirant')
        .setDefaultStats(-1, 0, 1, 1),
    bold: new Playbook('bold')
        .setDefaultStats(1, 1, 0, -1),
    destined: new Playbook('destined')
        .setDefaultStats(0, -1, 2, 0),
    elder: new Playbook('elder')
        .setDefaultStats(0, 0, 2, -1),
    foundling: new Playbook('foundling')
        .setDefaultStats(1, -1, 1, 0),
    guardian: new Playbook('guardian')
        .setDefaultStats(-1, 1, 0, 1),
    hammer: new Playbook('hammer')
        .setDefaultStats(1, -1, 0, 1),
    icon: new Playbook('icon')
        .setDefaultStats(0, 1, 1, -1),
    idealist: new Playbook('idealist')
        .setDefaultStats(0, -1, 1, 1),
    outcast: new Playbook('outcast')
        .setDefaultStats(2, -1, 0, 0),
    pillar: new Playbook('pillar')
        .setDefaultStats(1, 0, 1, -1),
    prodigy: new Playbook('prodigy')
        .setDefaultStats(-1, 2, 0, 0),
    razor: new Playbook('razor')
        .setDefaultStats(0, 2, -1, 0),
    rogue: new Playbook('rogue')
        .setDefaultStats(1, 0, -1, 1),
    successor: new Playbook('successor')
        .setDefaultStats(1, 1, -1, 0)
}