const { conditions } = require('../../../../utils/constants');

module.exports = {
  key: '_validateCondition',

  value(input) {
    if (!['string', 'number'].includes(typeof input)) {
      return { valid: false, condition: input };
    }

    const playbookConditions =
      this.playbook === 'Elder' ? conditions.ELDER : conditions.DEFAULT;

    if (isNaN(input)) {
      const condition = input
        .split('')
        .map((c, i) => (i ? c.toLowerCase() : c.toUpperCase()))
        .join('');

      if (playbookConditions.includes(condition)) {
        return {
          valid: true,
          index: playbookConditions.indexOf(condition),
          condition,
        };
      } else {
        return {
          valid: false,
          condition,
        };
      }
    } else {
      const index = parseInt(input);
      if (index < 0 || index > 4) {
        return { valid: false };
      }

      return {
        valid: true,
        index,
        condition: playbookConditions[index],
      };
    }
  },
};
