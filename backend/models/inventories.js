'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Inventories.hasMany(models.InventoryPermissions, {
        foreignKey: 'inventoryId',
        sourceKey: 'inventoryId',
        as: 'permissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      Inventories.belongsTo(models.UserAccounts, {
        foreignKey: 'creatorId',
        targetKey: 'userId',
        as: 'inventoryAccount',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Inventories.init({
    inventoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    creatorId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'UserAccounts',
        key: 'userId',
      },
      onDelete: 'CASCADE'
    },
    inventoryName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 100]
      } 
    },
    description: { 
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: true,
        len: [0, 100],
      },
    },
    type: {
      type: DataTypes.ENUM(
        'Goods', 'Service'
      ),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: { 
      type: DataTypes.ENUM(
        "Raw Materials", "Finished Goods","Work-in-Progress", "Consumables",
        "Office Supplies", "Machinery and Equipment","Furniture", "Electronics",
        "Vehicles", "Health and Safety","Packaging Materials", "Perishable Goods",
        "Non-Perishable Goods", "Tools","Miscellaneous"
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
    status: {
      type: DataTypes.ENUM(
        "In Stock","Out of Stock","Reserved","On Order",
        "In Transit","Backordered","Pending","Damaged",
        "Quarantined","Returned","Ready for Dispatch","Under Maintenance",
        "Expired","On Hold","Sold","Recalled","Available for Allocation"
      ),
      allowNull: false,
      validate: {
        notEmpty: true
      }
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
    modelName: 'Inventories',
    timestamps: false,
  });
  return Inventories;
};