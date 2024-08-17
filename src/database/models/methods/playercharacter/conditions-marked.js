// returns the total number of conditions marked (integer from 0 to 5)

module.exports = {
  key: 'conditionsMarked',

  value() {
    return this.conditions.split('').reduce((sum, c) => +c + sum, 0);
  },
};
