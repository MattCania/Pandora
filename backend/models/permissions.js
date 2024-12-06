'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Permissions.hasMany(models.RecordPermissions, {
        foreignKey: 'accessLevel',
        as: 'accessInfo',
        onDelete: 'CASCADE'
      })
      Permissions.hasMany(models.InventoryPermissions, {
        foreignKey: 'accessLevel',
        as: 'inventoryAccess',
        onDelete: 'CASCADE'
      })
    }
  }
  Permissions.init({
    accessId: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true 
    },
    accessType: { 
      type: DataTypes.ENUM('Admin', 'Owner', 'Editor', 'Viewer'),
      allowNull: false
    } 
  }, {
    sequelize,
    modelName: 'Permissions',
    timestamps: false,
    hooks:{
      afterDestroy: async () => {
        try {
          await sequelize.query(`ALTER TABLE Permissions AUTO_INCREMENT = 1`);
        } catch (error) {
          console.error('Error resetting AUTO_INCREMENT:', error);
        }
        }
    }
  });
  return Permissions;
};