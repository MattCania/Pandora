'use strict';
const {
  Model
} = require('sequelize');

// This wont be used, only if we have time
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Supplier.init({
    supplierId: { 
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 50],
      },
    },
    contactPerson: { 
      type:DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
      validate: {
        notEmpty: true,
        is: /^[a-zA-Z\s]*$/i,
        len: [2, 100],
      },
    },
    phone: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9\-\+\s]*$/,
        len: [7, 15],
      },
    },
    email: { 
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    address: { 
      type:DataTypes.STRING,
    },
    city: { 
      type:DataTypes.STRING,
    },
    country: { 
      type:DataTypes.STRING,
    },
    website: { 
      type:DataTypes.STRING,
    },
    notes: { 
      type:DataTypes.TEXT,
    },
    createdAt: { 
      type:DataTypes.DATE,
    },
    updatedAt: { 
      type:DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};