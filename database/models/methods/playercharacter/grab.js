const {
  conditions,
  STATS,
  STATUSES,
  TRAININGS,
} = require('../../../../constants');

module.exports = {
  key: 'fetch',

  static: true,

  async value(interaction, options) {
    let query = this.findOne.bind(this);

    const attributes = ['id', 'name'];

    const { id: userId } = interaction.user;
    const where = { userId, active: true };

    const queryOptions = { attributes, where };

    // by default, returns the name of the user's active PC
    if (!options) return await query(queryOptions);

    const { roster, allInfo, info } = options;

    // { roster: true }: return an array of all the user's PCs, not just active ones
    if (roster) {
      query = this.findAll.bind(this);
      where.active = { [Op.or]: [true, false] };
    }

    // { allInfo: true }: return all attributes, not just name
    if (allInfo) return await query({ where });

    // { info: string (or array of strings) }: adds attribute(s) to the query

    // shortcuts to add multiple attributes at once
    const attributeLookup = {
      advancement: [
        'growth',
        'advanceMoveOwn',
        'advanceMoveOther',
        'advanceCenter',
        'advanceMomentBalance',
        'advanceCreativity',
        'advanceFocus',
        'advanceHarmony',
        'advancePassion',
      ],
      balance: ['playbook', 'balance', 'center'],
      stats: STATS,
      statuses: STATUSES,
      training: TRAININGS,
    };

    const attributePush = attributeKey => {
      if (attributeKey in attributeLookup) {
        attributes.push(...attributeLookup[attributeKey]);
      } else {
        attributes.push(attributeKey);
      }
    };

    if (typeof info === 'string') {
      attributePush(info);
      console.log(attributes);
    } else if (Array.isArray(info)) {
      info.forEach(attributePush);
    }

    return await query(queryOptions);
  },
};
