Number.prototype.sign = function () {
  if (this >= 0) return `+${this}`;
  return `${this}`;
};

String.prototype.betterSplit = function (...splitters) {
  const useSplitter = splitters.find(splitter => this.includes(splitter));
  return this.split(useSplitter);
};
