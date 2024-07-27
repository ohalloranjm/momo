const { Move } = require('../../classes');

const intimidate = new Move('intimidate')
    .setTitle('Intimidate an NPC')
    .setStat('passion')
    .appendToResult('hit', 'They choose one.')
    .appendToResult('full', 'First, you pick one they cannot choose.')
    .appendToResult('bullet', 'hit', 'They run to escape or get backup.')
    .appendToResult('bullet', 'hit', 'They back down but keep watch.')
    .appendToResult('bullet', 'hit', 'They give in with a few stipulations.')
    .appendToResult('bullet', 'hit', 'They attack you, but off-balance; the GM marks a condition on them.');

module.exports = { 
    data: intimidate.command(),
    execute: intimidate.respond.bind(intimidate)
};