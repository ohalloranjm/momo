const { TRAININGS } = require('../../../../utils/constants');

module.exports = {
  key: 'trainingList',
  value(userView) {
    const list = TRAININGS.filter(training => this[training]);

    if (!userView) return list;
    if (!list.length) return 'Error: No training found';
    return list.map(training => training).join(', ');
  },
};
