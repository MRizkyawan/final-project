'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasOne(models.UserReview,{
        foreignKey : "order_id"
      })
    }
  };
  Order.init({
    id : {
      type : DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull : false,
      primaryKey : true
    },
    date: DataTypes.DATEONLY,
    passenger_id: DataTypes.UUID,
    bus_schedule_id: DataTypes.UUID,
    user_id: DataTypes.UUID,
    ticket: DataTypes.STRING,
    order_status: DataTypes.ENUM(['success','pending','expired'])
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};