"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserWallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserWallet.belongsTo(models.UserAccounts, {
        foreignKey: 'userId',
        targetKey: 'userId',
        as: 'userWallet',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  UserWallet.init(
    {
      walletId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: DataTypes.INTEGER,
        unique:true,
        references: {
          model: "UserAccounts",
          key: "userId",
          onDelete: "CASCADE",
        },
      },
      income: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          isNumeric: true,
          min: 0.0
        }
      },
      recurrance: {
        type: DataTypes.ENUM(
          'Weekly', 'Semi-Monthly', 'Monthly', 'Quarterly', 'Annually'
        ),
        allowNull: false,
        defaultValue: 'Monthly'
      },
      wallet: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
          isNumeric: true,
        }
      },
    },
    {
      sequelize,
      modelName: "UserWallets",
      timestamps: false
    }
  );
  return UserWallet;
};
