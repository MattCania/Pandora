'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyMembers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      CompanyMembers.belongsTo(models.Company, {
        foreignKey: 'organizationId',
        targetKey: 'companyId',
        as: 'companyMemberId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      CompanyMembers.belongsTo(models.UserAccounts, {
        foreignKey: 'accountId',
        targetKey: 'userId',
        as: 'companyMember',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

    }
  }
  CompanyMembers.init({
    associationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    accountId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'UserAccounts',
        key: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    },
    organizationId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'Company',
        key: 'companyId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s\-\']*$/i,
        len: [3, 25],
      },
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s\-\']*$/i,
        len: [2, 50],
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
    modelName: 'CompanyMembers',
  });
  return CompanyMembers;
};