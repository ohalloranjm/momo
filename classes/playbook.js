class Playbook {
  constructor(key) {
    this.key = key;
    this.name = `The ${key}`;
  }

  setDefaultStats(Creativity, Focus, Harmony, Passion) {
    this.Creativity = Creativity || 0;
    this.Focus = Focus || 0;
    this.Harmony = Harmony || 0;
    this.Passion = Passion || 0;
    return this;
  }

  setBalancePrinciples(leftPrinciple, rightPrinciple) {
    this.principles = [leftPrinciple, rightPrinciple];
    return this;
  }
}

module.exports = Playbook;
