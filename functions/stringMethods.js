String.prototype.betterSplit = function(...splitters) {
    const useSplitter = splitters.find(splitter => this.includes(splitter));
    return this.split(useSplitter);
}