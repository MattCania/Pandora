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
				onUpdate: 'CASCADE'
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
			orderNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: true,
					isAlphanumeric: true,
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
			category: {
				type: DataTypes.ENUM(
					"Income",
					"Expense",
					"Asset",
					"Liability",
					"Equity"
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
				defaultValue: DataTypes.NOW,
				validate: {
					notEmpty: true,
				},
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
			amount: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
				validate: {
					notEmpty: true,
					isDecimal: true,
					min: 0.0,
					max: 9999999,
				},
			},
			credit: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
				validate: {
					notEmpty: true,
					isDecimal: true,
					min: 0.0,
					max: 9999999,
				},
			},
			debit: { 
			  type: DataTypes.DECIMAL,
			  allowNull: false,
			  defaultValue: 0.00,
			  validate: {
				notEmpty: true,
				isDecimal: true,
				min: 0.0,
				max: 9999999,
			  } 
			},
			currency: {
				type: DataTypes.STRING,
				allowNull: false,
				defaultValue: "USD",
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
			balance: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				defaultValue: 0.0,
				validate: {
					isDecimal: true,
					min: 0.0,
					max: 9999999,
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
			  allowNull: false
			}
		},
		{
			sequelize,
			modelName: "Expenses",
			timestamps: true,
			hooks:{
				afterDestroy: async () => {
					try {
					  await sequelize.query(`ALTER TABLE Expenses AUTO_INCREMENT = 1`);
					} catch (error) {
					  console.error('Error resetting AUTO_INCREMENT:', error);
					}
				  }
			}
		}
	);
	return Expenses;
};
