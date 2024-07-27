const { Move, Roll } = require('../../classes');

const assess = new Move('assess')
    .setTitle('Assess a Situation')
    .setStat('creativity')
    .appendToResult('full', 'Ask two questions. Take +1 ongoing while acting on the answers.')
    .appendToResult('part', 'Ask one question. Take +1 ongoing while actitng on the answer.')
    .appendToResult('bullet', 'hit', 'What here can I use to ``     ``?')
    .appendToResult('bullet', 'hit', 'Who or what is the biggest threat?')
    .appendToResult('bullet', 'hit', 'What should I be on the lookout for?')
    .appendToResult('bullet', 'hit', 'What’s my best way out/in/through?')
    .appendToResult('bullet', 'hit', 'Who or what is in the greatest danger?')

module.exports = { 
    data: assess.command(),
    execute: assess.respond.bind(assess)
};