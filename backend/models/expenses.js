"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Expenses.belongsTo(models.TransactionRecords, {
        foreignKey: "expenseId",
        targetKey: "recordId",
        as: "expenseTransaction",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Expenses.init(
    {
      transactionId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      expenseId: {
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
		type: DataTypes.ENUM(
			"Completed",
			"Incomplete",
			"Pending",
			"Cancelled"
		),
    allowNull: false,
    defaultValue: "Completed",
    validate: {
      notEmpty: true,
    },
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
      modelName: "Expenses",
      timestamps: true,
      hooks: {
        afterDestroy: async () => {
          try {
            await sequelize.query(`ALTER TABLE Expenses AUTO_INCREMENT = 1`);
          } catch (error) {
            console.error("Error resetting AUTO_INCREMENT:", error);
          }
        },
      },
    }
  );
  return Expenses;
};
