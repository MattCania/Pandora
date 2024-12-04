'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init({
    inventoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [0, 100],
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      onUpdate: DataTypes.NOW 
    }
    
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};