String.prototype.capitalize = function() {
    return this[0].toUpperCase() + this.slice(1);
}

// module.exports = {
//     capitalize(string) {
//         if (typeof string !== 'string') throw Error('Function capitalize can only accept string arguments');
//         return string.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
//     }
// }