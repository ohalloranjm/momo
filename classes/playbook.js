class Playbook {
    constructor(key) {
        this.key = key;
        this.name = `The ${key[0].toUpperCase()}${key.slice(1)}`
    }

    setDefaultStats(creativity, focus, harmony, passion) {
        this.creativity = creativity || 0;
        this.focus = focus || 0;
        this.harmony = harmony || 0;
        this.passion = passion || 0;
        return this;
    }

    setBalancePrinciples(leftPrinciple, rightPrinciple) {
        this.principles = [leftPrinciple, rightPrinciple]
        return this;
    }

}

module.exports = Playbook;