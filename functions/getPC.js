const { BaseInteraction } = require('discord.js');
const { PlayerCharacter } = require('../database/models');
const { Op } = require('sequelize');
const { conditions, STATS, STATUSES, TRAININGS } = require('../constants');

BaseInteraction.prototype.getPC = async function(options) {
    let query = PlayerCharacter.findOne.bind(PlayerCharacter);

    const attributes = [ 'id', 'name' ];
    
    const { id: userId } = this.user;
    const where = { userId, active: true };
    
    const queryOptions = { attributes, where };

    // by default, return the name of the user's active PC
    if (!options) return await query(queryOptions);
    
    const { roster, allInfo, info } = options;
    
    // { roster: true }: return all of the user's PCs in an array, not just the active PC
    if (roster) {
        query = PlayerCharacter.findAll.bind(PlayerCharacter);
        where[active] = { [Op.or]: [true, false] }
    }

    // { allInfo: true }: return all attributes, not just name
    if (allInfo) {
        return await query({ where });
    }

    // { info: string (or array of strings) }: adds attribute(s) to the Sequelize query

    // shortcuts to add multiple attributes at once
    const attributeLookup = {
        advancement: [ 'growth', 'advanceMoveOwn', 'advanceMoveOther', 'advanceCenter', 'advanceMomentBalance', 'advanceCreativity', 'advanceFocus', 'advanceHarmony', 'advancePassion'],
        balance: [ 'playbook', 'balance', 'center' ],
        conditions: conditions.QUERY,
        stats: STATS,
        statuses: STATUSES,
        training: TRAININGS,
    }

    const attributePush = (attributeKey) => {
        if (attributeKey in attributeLookup) {
            attributes.push(...attributeLookup[attributeKey])
        } else {
            attributes.push(attributeKey);
        }
    }

    if (typeof info === 'string') {
        attributePush(info);
        console.log(attributes);
    } else if (Array.isArray(info)) {
        info.forEach(attributePush);
    }

    return await query(queryOptions);

}