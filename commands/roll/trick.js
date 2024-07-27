const { Move } = require('../../classes');

const trick = new Move('trick')
    .setTitle('Trick an NPC')
    .setStat('creativity')
    .appendToResult('hit', 'They fall for it and do what you want for the moment.')
    .appendToResult('full', 'Pick two:')
    .appendToResult('part', 'Pick one:')
    .appendToResult('bullet', 'hit', 'They stumble; take +1 forward to acting against them.')
    .appendToResult('bullet', 'hit', 'They act foolishly; the GM tells you what additional opportunity they give you.')
    .appendToResult('bullet', 'hit', 'They overcommit; they are deceived for some time.')    

module.exports = { 
    data: trick.command(),
    execute: trick.respond.bind(trick)
};