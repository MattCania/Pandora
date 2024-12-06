"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Company.hasMany(models.CompanyMembers, {
        foreignKey: "organizationId",
        sourceKey: "companyId",
        as: "memberCompany",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Company.init(
    {
      companyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "",
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
        },
      },
      companyDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
        },
      },
      foundedIn: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      industry: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: new Date(),
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z0-9\s]*$/i,
        },
      },
      locaction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[a-zA-Z0-9\s\-\']*$/i,
          len: [2, 50],
        },
      },
      about: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          is: /^[a-zA-Z\s]*$/i,
        },
      },
    },
    {
      sequelize,
      modelName: "Company",
      tableName: "Company",
      timestamps: true,
    }
  );
  return Company;
};
