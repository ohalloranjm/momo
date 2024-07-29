'use strict';
const {
  Model
} = require('sequelize');

require('../../functions');
const playbooks = require('../../playbooks');
const { Op } = require('sequelize');
const { conditions, STATS, STATUSES, TRAININGS } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class PlayerCharacter extends Model {

    static associate(models) {
      PlayerCharacter.belongsToMany(models.Technique, {
        through: models.PcTechnique,
        foreignKey: 'pcId',
        otherKey: 'techniqueId'
      })
    };

    static async fetch(interaction, options) {
      let query = this.findOne.bind(this);

      const attributes = [ 'id', 'name' ];
      
      const { id: userId } = interaction.user;
      const where = { userId, active: true };

      const queryOptions = { attributes, where };

      // by default, returns the name of the user's active PC
      if (!options) return await query(queryOptions);

      const { roster, allInfo, info } = options;

      // { roster: true }: return an array of all the user's PCs, not just active ones
      if (roster) {
        query = this.findAll.bind(this);
        where[active] = { [Op.or]: [ true, false ] };
      }

      // { allInfo: true }: return all attributes, not just name
      if (allInfo) return await query({ where });


      // { info: string (or array of strings) }: adds attribute(s) to the query

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

    // returns an array of marked conditions
    // toggle user view to output a string instead
    conditionList(userView) {
      const conditionNames = this.playbook === 'elder' ? conditions.ELDER : conditions.DEFAULT;

      const conditionMarks = [ this.conditionA, this.conditionB, this.conditionC, this.conditionD, this.conditionE ]

      const list = conditionNames.filter((_c, i) => conditionMarks[i]);

      if (!userView) return list;
      if (!list.length) return 'No Conditions';
      return list.map(condition => condition.capitalize()).join(', ')
      
    }

    // return the total number of conditions marked (integer from 0 to 5)
    conditionsMarked() {

      const conditions = [ this.conditionA, this.conditionB, this.conditionC, this.conditionD, this.conditionE ]

      return conditions.reduce((sum, condition) => +condition + sum, 0);

    }

    trainingList(userView) {
      const trainings = ['waterbending', 'earthbending', 'firebending', 'airbending', 'weapons', 'technology']
      const list = trainings.filter(training => this[training]);

      if (!userView) return list;
      if (!list.length) return 'Error: No training found';
      return list.map(training => training.capitalize()).join(', ')
    }

    getPlaybook() {
      return playbooks[this.playbook]
    }
    
  }
  
  PlayerCharacter.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    playbook: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['adamant', 'bold', 'guardian', 'hammer', 'icon', 'idealist', 'pillar', 'prodigy', 'rogue', 'successor', 'destined', 'elder', 'foundling', 'razor', 'adrift', 'aspirant', 'outcast']]
      }
    },
    creativity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: -2,
        max: 3
      }
    },
    focus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: -2,
        max: 3
      }
    },
    harmony: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: -2,
        max: 3
      }
    },
    passion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: -2,
        max: 3
      }
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: -3,
        max: 3
      }
    },
    center: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: -2,
        max: 3
      }
    },
    waterbending: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    earthbending: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    firebending: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    airbending: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    weapons: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    technology: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    backgrounds: {
      type: DataTypes.STRING,
    },
    demeanor: {
      type: DataTypes.STRING,
    },
    fatigue: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5
      }
    },
    conditionA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    conditionB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    conditionC: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    conditionD: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    conditionE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    empowered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    favored: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    inspired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    prepared: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    doomed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    impaired: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    trapped: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    stunned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    growth: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 4
      }
    },
    advanceMoveOwn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 2
      }
    },
    advanceMoveOther: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 2
      }
    },
    advanceCenter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 2
      }
    },
    advanceMomentBalance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 2
      }
    },
    advanceCreativity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
    advanceFocus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
    advanceHarmony: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
    advancePassion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      }
    },
  }, {
    sequelize,
    modelName: 'PlayerCharacter',
  });
  return PlayerCharacter;
};