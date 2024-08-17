module.exports = {
  key: 'shiftBalance',

  async value(principle = 'away', steps = 1) {
    steps = isNaN(steps) ? 1 : +steps;

    const { principles } = this.getPlaybook();
    const result = { principles, priorBalance: this.balance };

    if (this.balance === this.center) {
      if (principle === 'away') {
        result.newBalance = this.balance;
        result.status = 'need-principle';
        result.message =
          'Your balance is currently at your center. Choose a principle to shift toward.';
        return result;
      }

      if (principle === 'center') {
        result.newBalance = this.balance;
        result.status = 'already-center';
        result.message = 'Your balance is already at your center.';
        return result;
      }
    }

    const principleLookup = {
      [principles[0].toLowerCase()]: -1,
      [principles[1].toLowerCase()]: 1,
      left: -1,
      right: 1,
      away: this.balance > this.center ? 1 : -1,
      center: this.balance > this.center ? -1 : 1,
      '-1': -1,
      1: 1,
    };

    if (!(principle.toLowerCase() in principleLookup)) {
      result.newBalance = this.balance;
      result.status = 'need-principle';
      result.message = `${principle} is not a valid principle for your playbook. Choose a principle to shift toward.`;
      return result;
    }

    const direction = principleLookup[principle];

    const shift = direction * steps;
    const targetBalance = this.balance + shift;

    result.shifted = principles[(direction + 1) / 2];

    if (targetBalance < -3) {
      this.balance = -3;
      result.status = 'lose-balance';
      result.message = `${this.name} shifts their balance off the edge of their track. Confirm **lose your balance**? (If you are in a combat exchange, wait for the exchange to end. If you are in between sessions, don’t lose your balance.)`;
    } else if (targetBalance > 3) {
      this.balance = 3;
      result.status = 'lose-balance';
      result.message = `You shift your balance off the edge of your track, causing you to **lose your balance** toward ${principles[1]}—unless you are in the middle of a combat exchange (wait until the end of the exchange to lose your balance) or in between sessions (don’t lose your balance).`;
    } else {
      this.balance = targetBalance;
      result.status = 'shifted-balance';
      result.message = `${this.name} shifts their balance toward ${result.shifted}.`;
    }

    await this.save();

    result.newBalance = this.balance;

    return result;
  },
};
