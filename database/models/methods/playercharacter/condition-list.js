const { conditions } = require('../../../../constants');

module.exports = {
  key: 'conditionList',
  value(userView) {
    const conditionNames =
      this.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

    const conditionMarks = [
      this.conditionA,
      this.conditionB,
      this.conditionC,
      this.conditionD,
      this.conditionE,
    ];

    const list = conditionNames.filter((_c, i) => conditionMarks[i]);

    if (!userView) return list;
    if (!list.length) return 'No Conditions';
    return list.map(condition => condition.capitalize()).join(', ');
  },
};
