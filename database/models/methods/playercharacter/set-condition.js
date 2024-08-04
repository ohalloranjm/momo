const { conditions } = require('../../../../constants');

module.exports = {
  key: 'setCondition',

  async value(conditionIdx, val, options = {}) {
    const conditionsArr = this.conditions.split('');

    if (+conditionsArr[conditionIdx] === +val) return { status: 'no-change' };

    conditionsArr[conditionIdx] = +val;
    this.conditions = conditionsArr.join('');
    if (options.autosave !== false) await this.save();

    return { status: 'success' };
  },
};
