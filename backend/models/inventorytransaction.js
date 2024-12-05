'use strict';
const {
  Model
} = require('sequelize');

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
    inventoryId: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
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
    category: { 
      type: DataTypes.ENUM(
        "Raw Materials", "Finished Goods",
        "Work-in-Progress", "Consumables",
        "Office Supplies", "Machinery and Equipment",
        "Furniture", "Electronics",
        "Vehicles", "Health and Safety",
        "Packaging Materials", "Perishable Goods",
        "Non-Perishable Goods", "Tools",
        "Miscellaneous"
      ),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    quantity: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 0,
        isInt: true, 
      },
    },
    unitPrice: { 
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        notEmpty: true,
        min: 0.0,
        isInt: true, 
      },
    },
    supplier: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9\s\-\']*$/i,
        len: [2, 25],
      },
    },
    location: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z0-9\s\-\']*$/i,
        len: [2, 100],
      },
    },
    minQty: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notEmpty: true,
        min: 0,
        isInt: true, 
      }
    },
    status: {
      type: DataTypes.ENUM(
        "In Stock",
        "Out of Stock",
        "Reserved",
        "On Order",
        "In Transit",
        "Backordered",
        "Pending",
        "Damaged",
        "Quarantined",
        "Returned",
        "Ready for Dispatch",
        "Under Maintenance",
        "Expired",
        "On Hold",
        "Sold",
        "Recalled",
        "Available for Allocation"
      ),
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
    modelName: 'InventoryTransaction',
  });
  return InventoryTransaction;
};