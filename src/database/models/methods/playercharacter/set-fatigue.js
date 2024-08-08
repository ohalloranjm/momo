module.exports = {
  key: 'setFatigue',

  async value(target) {
    if (isNaN(target))
      return {
        success: false,
        message: `Fatigue must be an integer between 0 and 5.`,
      };

    const newFatigue = parseInt(target);

    if (newFatigue > 5)
      return {
        success: false,
        message: `Fatigue cannot be greater than 5.`,
      };

    const diff = newFatigue - this.fatigue;

    if (!diff)
      return {
        success: false,
        message: `${this.name} is already at ${newFatigue}-fatigue.`,
      };

    this.fatigue = newFatigue;
    await this.save();

    const response = { success: true };

    if (diff > 0) {
      response.message = `${this.name} marks ${diff}-fatigue, bringing them to ${newFatigue}-fatigue.`;
    } else if (newFatigue > 0) {
      response.message = `${this.name} clears ${Math.abs(
        diff
      )}-fatigue, bringing them to ${newFatigue}-fatigue.`;
    } else {
      response.message = `${this.name} clears all fatigue.`;
    }

    return response;
  },
};
