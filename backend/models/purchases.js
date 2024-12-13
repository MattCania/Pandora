"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Purchases.belongsTo(models.TransactionRecords, {
        foreignKey: "purchaseId",
        targetKey: "recordId",
        as: "purchaseTransaction",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Purchases.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      purchaseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "TransactionRecords",
          key: "recordId",
          onDelete: "CASCADE",
        },
      },
      account: {
        type: DataTypes.ENUM(
          "Revenue",
          "Expenses",
          "Equity",
          "Assets",
          "Liabilities"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      paymentType: {
        type: DataTypes.ENUM(
          "Cash",
          "Credit Card",
          "Bank Transfer",
          "Digital Wallet",
          "Check"
        ),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      transactionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      amount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          notEmpty: true,
        },
      },
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "USD",
        validate: {
          notEmpty: true,
        },
      },
      recurring: {
        type: DataTypes.ENUM(
          'Monthly', 'Semi-Monthly', 'Annually', 'Quarterly'
        ),
        allowNull: false,
        defaultValue: "Monthly",
        validate: {
          notEmpty: true,
        },
      },
      vendorCustomer: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "",
      },
      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      tax: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          isDecimal: true,
          min: 0.0,
          max: 9999999,
        },
      },
      status: {
        type: DataTypes.ENUM("Completed", "Incomplete", "Pending", "Cancelled"),
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        onUpdate: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Purchases",
      timestamps: true,
      hooks: {
        afterDestroy: async () => {
          try {
            await sequelize.query(`ALTER TABLE Purchases AUTO_INCREMENT = 1`);
          } catch (error) {
            console.error("Error resetting AUTO_INCREMENT:", error);
          }
        },
      },
    }
  );
  return Purchases;
};
