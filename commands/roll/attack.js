const { StanceMove } = require('../../classes');

const attack = new StanceMove('attack')
  .setTitle('Advance & Attack')
  .setStat('Passion');

module.exports = {
  data: attack.command(),
  execute: attack.respond.bind(attack),
};
