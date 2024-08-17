const Move = require('./move');

class StanceMove extends Move {
  constructor(key) {
    super(key);

    this.conditionModifiers = {
      Remorseful: -2,
    };

    this.resultLines = [
      ['part', 'Use one basic or mastered technique.'],
      ['full', 'Choose one:'],
      ['bullet', 'full', 'Mark 1-fatigue to use a learned technique.'],
      ['bullet', 'full', 'Use one practiced technique.'],
      ['bullet', 'full', 'Use two different basic or mastered techniques.'],
      [
        'miss',
        'You stumble, but you can shift your balance away from center to use one basic technique.',
      ],
    ];
  }

  setTitle(title) {
    this.title = `Stance Move: ${title}`;
    return this;
  }
}

module.exports = StanceMove;
