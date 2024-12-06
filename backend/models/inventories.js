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

      Inventories.hasMany(models.InventoryTransaction, {
        foreignKey: 'inventoryRecord',
        sourceKey: 'inventoryId',
        as: 'inventoryRecordRef',
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
    modelName: 'Inventories',
    timestamps: false,
  });
  return Inventories;
};