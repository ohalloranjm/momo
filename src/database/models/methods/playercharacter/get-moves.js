const { playbookMoves } = require('../../../../playbooks');

module.exports = {
  key: 'getMoves',

  value(userView = false) {
    const moves = this.TakenMoves.map(tm => tm.moveId).map(
      key => playbookMoves[key]
    );
    this.moves = moves;
    if (!userView) return moves;
    if (!moves) return 'None';
    return moves.join(', ');
  },
};
