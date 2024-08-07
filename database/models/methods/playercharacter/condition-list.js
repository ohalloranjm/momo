// returns an array of marked conditions
// toggle user view to output a string instead

const { conditions } = require('../../../../utils/constants');

module.exports = {
  key: 'conditionList',

  value(userView) {
    const conditionNames =
      this.playbook === 'Elder' ? conditions.ELDER : conditions.DEFAULT;

    const list = conditionNames.filter(
      (_c, i) => +this.conditions.split('')[i]
    );

    if (!userView) return list;
    if (!list.length) return 'None';
    return list.join(', ');
  },
};
