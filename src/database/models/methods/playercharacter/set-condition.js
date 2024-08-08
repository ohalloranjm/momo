module.exports = {
  key: 'setCondition',

  async value(conditionKey, val, options = {}) {
    const { condition, valid, index } = this._validateCondition(conditionKey);

    if (!valid)
      return {
        success: false,
        message: `${condition} is not a valid condition for the ${this.playbook}.`,
      };

    const conditionsArr = this.conditions.split('');

    if (+conditionsArr[index] === +val)
      return {
        success: false,
        message: `${this.name} ${
          val ? 'is already' : 'already isn’t'
        } ${condition}.`,
      };

    conditionsArr[index] = +val;
    this.conditions = conditionsArr.join('');
    if (options.autosave !== false) await this.save();

    return {
      success: true,
      message: `${this.name} ${val ? 'marks' : 'clears'} ${condition}!`,
    };
  },
};
