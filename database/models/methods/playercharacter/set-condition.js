const { conditions } = require('../../../../constants');

module.exports = {
  key: 'setCondition',

  async value(condition, val, options = {}) {
    const playbookConditions =
      this.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

    if (!playbookConditions.includes(condition))
      return {
        message: `${condition} is not a valid condition for this playbook.`,
      };

    const idx = playbookConditions.indexOf(condition);

    const conditionsArr = this.conditions.split('');

    if (+conditionsArr[idx] === +val)
      return { message: `${condition} is already ${val ? marked : cleared}.` };

    conditionsArr[idx] = +val;
    this.conditions = conditionsArr.join('');
    if (options.autosave !== false) await this.save();

    return {
      message: `${this.name} marks ${condition}!`,
    };
  },
};
