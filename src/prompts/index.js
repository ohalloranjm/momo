const path = require('node:path');
const fs = require('node:fs');

module.exports = function (interaction) {
  const filePaths = fs
    .readdirSync(__dirname)
    .filter(file => file !== 'index.js' && file.endsWith('.js'))
    .map(file => path.join(__dirname, file));

  const callbacks = {};

  for (const filePath of filePaths) {
    const fnc = require(filePath);
    if ('name' in fnc && 'execute' in fnc) {
      callbacks[fnc.name] = async function (...params) {
        return fnc.execute(interaction, ...params);
      };
    }
  }

  return callbacks;
};
