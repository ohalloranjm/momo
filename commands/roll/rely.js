const { Move } = require('../../classes');

const rely = new Move('rely')
    .setTitle('Rely on Your Skills & Training')
    .setStat('focus')
    .appendToResult('full', 'You do it.')
    .appendToResult('part', 'You do it imperfectly—the GM tells you how your approach might lead to unexpected consequences; accept those consequences or mark 1-fatigue.')

module.exports = { 
    data: rely.command(),
    execute: rely.respond.bind(rely)
};