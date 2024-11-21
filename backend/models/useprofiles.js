'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserProfiles.belongsTo(models.UserAccounts, {
        foreignKey: 'profileId',
        targetKey: 'userId',
        as: 'accountDetails'
      })
    }
  }
  UserProfiles.init({
    profileId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'UserAccounts',
        key: 'userId'
      },
      onDelete: 'CASCADE'
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 25]
      }
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: [7, 15]
      }
    },
    secondaryEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    jobTitle: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [3, 25]
      }
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [2, 50]
      }
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [2, 50]
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [2, 50]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [2, 50]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [2, 50]
      }
    },
    postal: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [2, 50]
      }
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true
      }
    },
    gender: {
      type: DataTypes.ENUM('Male', 'Female', 'Other'),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'UserProfiles',

    afterDestroy: async () => {
      try {
        await sequelize.query(`ALTER TABLE UserProfiless AUTO_INCREMENT = 1`);
      } catch (error) {
        console.error('Error resetting AUTO_INCREMENT:', error);
      }
    }
  });
  return UserProfiles;
};