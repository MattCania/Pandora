"use strict";
const bcrypt = require("bcrypt");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAccounts.hasOne(models.UserProfiles, {
        foreignKey: "profileId",
        as: "accountProfile",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      UserAccounts.hasOne(models.UserRoles, {
        foreignKey: "userId",
        as: "accountRole",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      UserAccounts.hasMany(models.TransactionRecords, {
        foreignKey: "creatorId",
        as: "accountRecord",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      UserAccounts.hasOne(models.Admins, {
        foreignKey: "accountId",
        as: "accountAdmin",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      UserAccounts.hasMany(models.ProfileImage, {
        foreignKey: 'userId',
        as: 'imageId',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })

      UserAccounts.hasMany(models.CompanyMembers, {
        foreignKey: 'accountId',
        as: 'userCompany',
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })

    }
  }
  UserAccounts.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
          len: [2, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
          len: [2, 25],
        },
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
          len: [2, 25],
        },
      },
      suffix: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
          len: [2, 15],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          isEmail: true,
          len: [2, 25],
        },
      },
      securedPassword: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
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
    },
    {
      sequelize,
      modelName: "UserAccounts",

      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.securedPassword = await bcrypt.hash(user.securedPassword, salt);

          user.firstName = user.firstName.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );
          user.lastName = user.lastName.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );
          if (user.middleName)
            user.middleName = user.middleName.replace(/\b\w/g, (char) =>
              char.toUpperCase()
            );
          if (user.suffix)
            user.suffix = user.suffix.replace(/\b\w/g, (char) =>
              char.toUpperCase()
            );
        },
        beforeUpdate: async (user) => {
          if (user.changed("securedPassword")) {
            const salt = await bcrypt.genSalt(10);
            user.securedPassword = await bcrypt.hash(
              user.securedPassword,
              salt
            );
          }
          user.firstName = user.firstName.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );
          user.lastName = user.lastName.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          );
          if (user.middleName)
            user.middleName = user.middleName.replace(/\b\w/g, (char) =>
              char.toUpperCase()
            );
          if (user.suffx)
            user.suffix = user.suffix.replace(/\b\w/g, (char) =>
              char.toUpperCase()
            );
        },
        afterDestroy: async () => {
          try {
            await sequelize.query(
              `ALTER TABLE UserAccounts AUTO_INCREMENT = 1`
            );
          } catch (error) {
            console.error("Error resetting AUTO_INCREMENT:", error);
          }
        },
      },
    }
  );
  return UserAccounts;
};
