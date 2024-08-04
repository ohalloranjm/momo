const { conditions } = require('../../../../constants');

module.exports = {
  key: 'setCondition',

  async value(condition, val, options) {
    const playbookConditions =
      this.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

    if (!playbookConditions.includes(condition))
      throw Error('Not a valid condition for this playbook.');

    const idx = playbookConditions.indexOf(condition);

    const conditionsArr = this.conditions.split('');

    if (+conditionsArr[idx] === +val) return;
  },
};
