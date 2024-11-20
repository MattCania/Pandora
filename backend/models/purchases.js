'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchases.belongsTo(models.TransactionRecords, {
        foreignKey: 'recordId',
        as: 'transactionId'
      })
    }
  }
  Purchases.init({
    purchaseId: { 
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    recordId: { 
      type: DataTypes.INTEGER,
      references: {
        model: 'TransactionRecords',
        key: 'recordId',
        onDelete: 'CASCADE'
      }
    },
    orderNumber: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isAlphanumeric: true
      }
    },
    account: { 
      type: DataTypes.ENUM('Revenue', 'Expenses', 'Equity', 'Assets', 'Liabilities'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    category: {
      type: DataTypes.ENUM('Income','Expense','Asset','Liability','Equity'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    paymentType: { 
      type: DataTypes.ENUM('Cash','Credit Card','Bank Transfer','Digital Wallet','Check'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    transactionDate: { 
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: { 
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    amount: { 
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true
      } 
    },
    credit: { 
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        notEmpty: true
      } 
    },
    currency: { 
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
      validate: {
        notEmpty: true
      }
    },
    vendorCustomer: { 
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    invoiceNumber: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      } 
    },
    tax: { 
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        isDecimal: true,
        min: 0.00,
        max: 9999999
      }
    },
    balance: { 
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        isDecimal: true,
        min: 0.00,
        max: 9999999
      }
   }
  }, {
    sequelize,
    modelName: 'Purchases',
    timestamps: true
  });
  return Purchases;
};