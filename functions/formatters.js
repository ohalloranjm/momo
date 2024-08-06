Number.prototype.sign = function () {
  if (this >= 0) return `+${this}`;
  return `${this}`;
};
