module.exports = {
  key: 'resetBalance',

  async value() {
    const result = { oldBalance: this.balance };

    if (this.balance === this.center) {
      result.newBalance = this.balance;
      result.message = `${this.name}’s balance is already at their center.`;
      return result;
    }

    this.balance = this.center;
    result.newBalance = this.center;
    result.message = `${this.name} takes some time to recenter themself, returning their balance to center.`;
    await this.save();
    return result;
  },
};
