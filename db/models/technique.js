'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Technique extends Model {

    static associate(models) {
      Technique.belongsToMany(models.PlayerCharacter, {
        through: models.PcTechnique,
        foreignKey: 'techniqueId',
        otherKey: 'pcId'
      })
    }
  }
  Technique.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    approach: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['defend', 'advance', 'evade']]
      }
    },
    training: {
      type: DataTypes.STRING,
      validate: {
        isIn: [['waterbending', 'earthbending', 'firebending', 'airbending', 'weapons', 'technology', 'group' ]]
      }
    },
    effect: {
      type: DataTypes.BLOB,
    },
    rare: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    special: {
      type: DataTypes.STRING,
      isIn: [[ 'healing', 'spirit', 'seismic sense', 'metal', 'lava', 'lightning' ]]
    },
  }, {
    sequelize,
    modelName: 'Technique',
  });
  return Technique;
};