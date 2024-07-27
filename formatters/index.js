String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1);
}

Number.prototype.sign = function() {
    if (this >= 0) return `+${this}`
    return `${this}` 
}