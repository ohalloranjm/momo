const { Move } = require('../../classes');

const push = new Move('push')
    .setTitle('Push Your Luck')
    .setStat('passion')
    .appendToResult('hit', 'You do it, but it costs you to scrape by; the GM tells you what it costs you.')
    .appendToResult('full', 'Your boldness pays off despite the cost; the GM tells you what other lucky opportunity falls in your lap.')

module.exports = { 
    data: push.command(),
    execute: push.respond.bind(push)
};