'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionRecords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TransactionRecords.hasMany(models.RecordPermissions, {
        foreignKey: 'recordId',
        as: 'recordPermissions'
      })

      TransactionRecords.hasMany(models.Expenses, {
        foreignKey: 'recordId',
        as: 'expenseRecord',
        onDelete: 'CASCADE'
      })

      TransactionRecords.hasMany(models.Purchases, {
        foreignKey: 'recordId',
        as: 'purchaseRecord',
        onDelete: 'CASCADE'
      })

      // Foreign Key in use
      TransactionRecords.belongsTo(models.UserAccounts, {
        foreignKey: 'creatorId',
        targetKey: 'userId',
        as: 'creatorInfo',
        onDelete: 'CASCADE'
      })

    }
  }
  TransactionRecords.init({
    recordId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    creatorId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'UserAccounts',
        key: 'userId',
        onDelete: 'CASCADE'
      }
    },
    recordType: { 
      type: DataTypes.ENUM('Expenses', 'Purchases'),
      allowNull: false
    },
    recordName: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100]
      } 
    }
  }, {
    sequelize,
    modelName: 'TransactionRecords',
  });
  return TransactionRecords;
};