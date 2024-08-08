const { StanceMove } = require('../../classes');

const defend = new StanceMove('defend')
  .setTitle('Defend & Maneuver')
  .setStat('Focus');

module.exports = {
  data: defend.command(),
  execute: defend.respond.bind(defend),
};
