'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InventoryPermissions.init({
    permissionId: DataTypes.INTEGER,
    inventoryId: DataTypes.INTEGER,
    permittedUser: DataTypes.INTEGER,
    accessLevel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'InventoryPermissions',
  });
  return InventoryPermissions;
};