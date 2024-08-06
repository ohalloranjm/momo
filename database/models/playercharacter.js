'use strict';
const { Model } = require('sequelize');
const path = require('node:path');
const fs = require('node:fs');
const { Op } = require('sequelize');
const { conditions, STATS, STATUSES, TRAININGS } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class PlayerCharacter extends Model {
    static associate(models) {
      PlayerCharacter.belongsToMany(models.Technique, {
        through: models.PcTechnique,
        foreignKey: 'pcId',
        otherKey: 'techniqueId',
      });
    }
  }

  // apply custom methods
  const methodsPath = path.join(__dirname, 'methods', 'playercharacter');
  const methodFiles = fs
    .readdirSync(methodsPath)
    .filter(file => file.endsWith('.js'));
  for (const file of methodFiles) {
    const filePath = path.join(methodsPath, file);
    const data = require(filePath);
    if ('key' in data && 'value' in data) {
      if (data.static) {
        PlayerCharacter[data.key] = data.value;
      } else {
        PlayerCharacter.prototype[data.key] = data.value;
      }
    } else {
      console.error(
        `[WARNING] The method at ${filePath} is missing a required "key" or "value" property.`
      );
    }
  }

  PlayerCharacter.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      playbook: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [
            [
              'adamant',
              'bold',
              'guardian',
              'hammer',
              'icon',
              'idealist',
              'pillar',
              'prodigy',
              'rogue',
              'successor',
              'destined',
              'elder',
              'foundling',
              'razor',
              'adrift',
              'aspirant',
              'outcast',
            ],
          ],
        },
      },
      creativity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      focus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      harmony: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      passion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -3,
          max: 3,
        },
      },
      center: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      waterbending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      earthbending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      firebending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      airbending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      weapons: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      technology: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
          max: 5,
        },
      },
      conditions: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '00000',
        validate: {
          len: [5, 5],
          binary(str) {
            if (str.split('').some(char => !['0', '1'].includes(char)))
              throw Error('String must be composed of only 1s and 0s.');
          },
        },
      },
      empowered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      favored: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      inspired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      prepared: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      doomed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      impaired: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      trapped: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      stunned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      growth: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 4,
        },
      },
      advanceMoveOwn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 2,
        },
      },
      advanceMoveOther: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 2,
        },
      },
      advanceCenter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 2,
        },
      },
      advanceMomentBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 2,
        },
      },
      advanceCreativity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      advanceFocus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      advanceHarmony: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      advancePassion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
    },
    {
      sequelize,
      modelName: 'PlayerCharacter',
    }
  );
  return PlayerCharacter;
};
