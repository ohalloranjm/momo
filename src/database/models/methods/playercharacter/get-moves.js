const { playbookMoves } = require('../../../../playbooks');

module.exports = {
  key: 'getMoves',

  value() {
    return this.moves
      ? this.moves.split(',').map(key => playbookMoves[key])
      : [];
  },
};
