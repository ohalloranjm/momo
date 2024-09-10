const { playbooks } = require('../../../../playbooks');

module.exports = {
  key: 'getPlaybook',
  value() {
    return playbooks[this.playbook];
  },
};
