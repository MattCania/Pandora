'use strict';
const {
  Model
} = require('sequelize');
// This wont be used either, walang time
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 25],
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
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};