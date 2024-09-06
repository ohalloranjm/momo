module.exports = {
  key: 'markFatigue',

  async value(n) {
    n = isNaN(n) || parseInt(n) < 1 ? 1 : parseInt(n);

    const target = this.fatigue + n;

    if (target <= 5) return await this.setFatigue(target);

    const response = await this.setFatigue(5);
    const spillover = target - 5;
    response.message =
      response.message.slice(0, -1) +
      `, and is forced to mark ${spillover} conditions.`;

    const conditionsMarked = this.conditionsMarked();

    if (spillover > 5 - conditionsMarked) {
      response.message += ` ${this.name} is taken out!`;
      this.conditions = '11111';
      await this.save();
    } else {
      response.message += ' (Use ``/c`` or ``/condition`` to mark them.)';
    }

    return response;
  },
};
