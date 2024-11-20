'use strict';
const bcrypt = require('bcrypt');

const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAccounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAccounts.hasOne(models.UserProfile,  {
        foreignKey: 'profileId',
        as: 'profileDetails',
        onDelete: 'CASCADE'
      })

      UserAccounts.hasOne(models.UserRoles, {
        foreignKey: 'userId',
        as: 'roleId'   ,
        onDelete: 'CASCADE'
      })

      UserAccounts.hasMany(models.TransactionRecords, {
        foreignKey: 'creatorId',
        as: 'creatorInfo',
        onDelete: 'CASCADE'
      })

      UserAccounts.hasOne(models.Admin, {
        foreignKey: 'accountId',
        as: 'adminDetails',
        onDelete: 'CASCADE'
      })

    }
  }
  UserAccounts.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 25]
      }
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 25]
      }
    },
    suffix: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 15]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
        len: [2, 25]
      }
    },
    securedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    }
  }, {
    sequelize,
    modelName: 'UserAccounts',
    timestamps: true,

    hooks:{
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        user.securedPassword = await bcrypt.hash(user.securedPassword, salt);
      }, 
      beforeUpdate: async (user) => {
        if (user.changed('securedPassword')) {
          const salt = await bcrypt.genSalt(10);
          user.securedPassword = await bcrypt.hash(user.securedPassword, salt);
        }
      },
      afterDestroy: async () => {
        try {
          await sequelize.query(`ALTER TABLE UserAccounts AUTO_INCREMENT = 1`);
        } catch (error) {
          console.error('Error resetting AUTO_INCREMENT:', error);
        }
      }
    },
  });
  return UserAccounts;
};