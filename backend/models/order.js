'use strict';
const {
  Model
} = require('sequelize');
// This wont be used either, walang time
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    orderId: DataTypes.INTEGER,
    supplierId: DataTypes.INTEGER,
    orderDate: DataTypes.DATE,
    deliveryDate: DataTypes.DATE,
    status: DataTypes.STRING,
    totalAmount: DataTypes.DECIMAL,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};