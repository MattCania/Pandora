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
        as: 'recordPermissions',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      TransactionRecords.hasMany(models.Expenses, {
        foreignKey: 'expenseId',
        as: 'expenseRecord',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      TransactionRecords.hasMany(models.Purchases, {
        foreignKey: 'purchaseId',
        as: 'purchaseRecord',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

      TransactionRecords.belongsTo(models.UserAccounts, {
        foreignKey: 'creatorId',
        targetKey: 'userId',
        as: 'creatorAccount',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

    }
  }
  TransactionRecords.init({
    recordId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    creatorId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'UserAccounts',
        key: 'userId',
      },
      onDelete: 'CASCADE'
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
    modelName: 'TransactionRecords',
    hooks:{
      afterDestroy: async (instance) => {
        try {
          await sequelize.query(`ALTER TABLE TransactionRecords AUTO_INCREMENT = 1`);
        } catch (error) {
          console.error('Error resetting AUTO_INCREMENT:', error);
        }
        }
    }
  });
  return TransactionRecords;
};