class Playbook {
  constructor(key) {
    this.key = key;
    this.name = `The ${key}`;
  }

  setDefaultStats(Creativity, Focus, Harmony, Passion) {
    this.defaultStats = {
      Creativity: Creativity || 0,
      Focus: Focus || 0,
      Harmony: Harmony || 0,
      Passion: Passion || 0,
    };
    return this;
  }

  setBalancePrinciples(leftPrinciple, rightPrinciple) {
    this.principles = [leftPrinciple, rightPrinciple];
    return this;
  }
}

module.exports = Playbook;
