// returns the total number of conditions marked (integer from 0 to 5)

module.exports = {
  key: 'conditionsMarked',

  value() {
    const conditions = [
      this.conditionA,
      this.conditionB,
      this.conditionC,
      this.conditionD,
      this.conditionE,
    ];

    return conditions.reduce((sum, condition) => +condition + sum, 0);
  },
};
