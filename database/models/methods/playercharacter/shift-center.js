module.exports = {
  key: 'shiftCenter',

  // d = -1: shift one step left, d = 1: shift one step right
  async value(d) {
    if (d !== 1 && d !== -1) throw RangeError('d must be 1 or -1');
    const result = { oldCenter: this.center };
    const { principles } = this.getPlaybook();

    if (Math.abs(this.center + d) > 3) {
      result.message =
        'Momo cannot shift your center off the edge of your balance track.';
      result.newCenter = this.center;
      return result;
    } else {
      this.center += d;
      await this.save();
      result.newCenter = this.center;
      result.message = `${this.name} shifts their center toward ${
        d < 0 ? principles[0] : principles[1]
      }. New center: ${(-this.center).sign()} ${
        principles[0]
      } / ${this.center.sign()} ${principles[1]}.`;
      return result;
    }
  },
};
