'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfileImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      ProfileImage.belongsTo(models.UserAccounts, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })

    }
  }
  ProfileImage.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      references: {
        model: 'UserAccounts',
        key: 'userId'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    profileImg: {
      type: DataTypes.BLOB('long'),
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'ProfileImage',
  });
  return ProfileImage;
};