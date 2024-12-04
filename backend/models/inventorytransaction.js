'use strict';
const {
  Model
} = require('sequelize');

// This wont be used either, walang time
module.exports = (sequelize, DataTypes) => {
  class InventoryTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryTransaction.init({
    transactionId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    transactionType: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    date: DataTypes.DATE,
    notes: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'InventoryTransaction',
  });
  return InventoryTransaction;
};