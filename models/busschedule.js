'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BusSchedule.belongsTo(models.Bus)
    }
  };
  BusSchedule.init({
    id : {
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true
    },
    departure_time: DataTypes.TIME,
    arrival_time: DataTypes.TIME,
    shuttle_id: DataTypes.UUID,
    bus_id: DataTypes.UUID,
    bus_provider_id: DataTypes.UUID,
    destination_city: DataTypes.STRING,
    departure_city: DataTypes.STRING,
    destination_shuttle: DataTypes.STRING,
    departure_shuttle: DataTypes.STRING,
    available_seat: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BusSchedule',
  });
  return BusSchedule;
};