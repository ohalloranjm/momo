'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PcTechnique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association her
    }
  }
  PcTechnique.init({
    pcId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    techniqueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        
      }
    }
  }, {
    sequelize,
    modelName: 'PcTechnique',
  });
  return PcTechnique;
};