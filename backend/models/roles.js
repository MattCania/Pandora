'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Roles.hasMany(models.UserRoles, {
        foreignKey: 'roleId',
        as: 'assignedRole',
        onDelete: 'CASCADE'
      })
    }
  }
  Roles.init({
    roleId: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roleName: { 
      type: DataTypes.ENUM('Admin', 'Owner', 'Editor', 'Viewer'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Roles',
    timestamps: false
  });
  return Roles;
};