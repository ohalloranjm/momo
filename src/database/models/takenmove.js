'use strict';
const { Model } = require('sequelize');
const { playbookMoves } = require('../../playbooks');

module.exports = (sequelize, DataTypes) => {
  class TakenMove extends Model {
    static associate(models) {
      TakenMove.belongsTo(models.PlayerCharacter, {
        foreignKey: 'playerCharacterId',
      });
    }
  }
  TakenMove.init(
    {
      playerCharacterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      moveId: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [Object.keys(playbookMoves)],
        },
      },
    },
    {
      sequelize,
      modelName: 'TakenMove',
    }
  );
  return TakenMove;
};
