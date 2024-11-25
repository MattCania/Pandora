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
      autoIncrement: true,
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING
    },
    description: { 
      type: DataTypes.TEXT
    },
    category: { 
      type: DataTypes.STRING
    },
    quantity: { 
      type: DataTypes.INTEGER
    },
    unitPrice: { 
      type: DataTypes.DECIMAL
    },
    supplierId: { 
      type: DataTypes.INTEGER
    },
    location: { 
      type: DataTypes.STRING
    },
    minQty: { 
      type: DataTypes.INTEGER
    },
    status: { 
      type: DataTypes.STRING
    },
    createdAt: { 
      type: DataTypes.DATE
    },
    updatedAt: { 
      type: DataTypes.DATE
    } 
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};