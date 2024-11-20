'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admins extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Admins.belongsTo(models.UserAccounts, {
        foreignKey: 'accountId',
        targetKey: 'userId',
        as: 'accountInfo',
        onDelete: 'CASCADE'
      }) 
      
    }
  }
  Admins.init({
    accountId: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'UserAccounts',
        key: 'userId',
        onDelete: 'CASCADE'
      },
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      } 
    },
    password: { 
      type: DataTypes.STRING,
      validate: {
        is: /^[a-zA-Z0-9\s]*$/i,
        len: [8, 25]
      }
    } 
  }, {
    sequelize,
    modelName: 'Admins',
    timestamps: false,
    afterDestroy: async () => {
      try {
        await sequelize.query(`ALTER TABLE Admins AUTO_INCREMENT = 1`);
      } catch (error) {
        console.error('Error resetting AUTO_INCREMENT:', error);
      }
    }
  });
  return Admins;
};