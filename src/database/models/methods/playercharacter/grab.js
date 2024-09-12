const { BaseInteraction, User } = require('discord.js');
const { STATS, TRAININGS } = require('../../../../utils/constants');

const { Op } = require('sequelize');

module.exports = {
  key: 'grab',

  static: true,

  async value(user, options) {
    // parse arguments
    if (user instanceof BaseInteraction) user = user.user;
    if (user instanceof User) user = user.id;
    if (Array.isArray(options) || typeof options === 'string') {
      options = { info: options };
    }

    // configure default query
    let query = this.findOne.bind(this);
    const where = { userId: user, active: true };
    const attributes = ['id', 'name', 'playbook'];
    const include = require('../../index.js').TakenMove;
    const queryOptions = { attributes, where, include };

    // BY DEFAULT, returns the name & playbook of the user's active PC
    if (!options) return await query(queryOptions);

    // IF OPTIONS
    const { roster, allInfo, info } = options;

    // { roster: true } option
    /// return an array of all the user's PCs, not just active ones
    if (roster) {
      query = this.findAll.bind(this);
      where.active = { [Op.or]: [true, false] };
      attributes.push('active');
    }

    // { allInfo: true } option
    // return all attributes, not just name & playbook
    if (allInfo) return await query({ where });

    // { info: string (or array of strings) } option
    // adds attribute(s) to the query
    // if options arg is a string or array, it's treated as the value of an info option

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
    } else if (Array.isArray(info)) {
      info.forEach(attributePush);
    }

    return await query(queryOptions);
  },
};
