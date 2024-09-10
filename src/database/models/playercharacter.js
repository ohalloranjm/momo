'use strict';
const { Model } = require('sequelize');
const path = require('node:path');
const fs = require('node:fs');
const { playbooks, playbookMoves } = require('../../playbooks');

module.exports = (sequelize, DataTypes) => {
  class PlayerCharacter extends Model {}

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
          isIn: [Object.keys(playbooks)],
        },
      },
      Creativity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      Focus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      Harmony: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: -2,
          max: 3,
        },
      },
      Passion: {
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
          min: -3,
          max: 3,
        },
      },
      moves: {
        type: DataTypes.STRING(500),
        allowNull: false,
        defaultValue: '',
        validate: {
          onlyMoves(val) {
            if (
              val.length &&
              val.split(',').some(move => !(move in playbookMoves))
            ) {
              throw Error(`${val} is not a valid string of playbook moves.`);
            }
          },
        },
      },
      Waterbending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Earthbending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Firebending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Airbending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Weapons: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      Technology: {
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
    },
    {
      sequelize,
      modelName: 'PlayerCharacter',
    }
  );
  return PlayerCharacter;
};
