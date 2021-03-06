'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shuttle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Shuttle.init({
    id : {
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true
    },
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    total_bus: DataTypes.INTEGER,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Shuttle',
  });
  return Shuttle;
};