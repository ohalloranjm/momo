const path = require('path');
const fs = require('fs');

const playbooks = {};
const playbookMoves = {};

const playbookArr = fs
  .readdirSync(__dirname)
  .filter(name => !name.endsWith('.js'))
  .map(folderName => path.resolve(__dirname, folderName));

for (const pbPath of playbookArr) {
  const data = require(pbPath);
  playbooks[data.key] = data;
  data.moves.forEach((move, i) => {
    playbookMoves[data.key + i] = move;
  });
}

module.exports = { playbooks, playbookMoves };
