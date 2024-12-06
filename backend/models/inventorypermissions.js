'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InventoryPermissions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
		InventoryPermissions.belongsTo(models.Permissions, {
			foreignKey: "accessLevel",
			targetKey: "accessId",
			as: "userAccess",
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});

		InventoryPermissions.belongsTo(models.Inventories, {
			foreignKey: "inventoryId",
			targetKey: 'inventoryId',
			as: "transactionPermission",
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		});

		InventoryPermissions.belongsTo(models.UserProfiles, {
			foreignKey: "permittedUser",
			targetKey: "profileId",
			as: "userProfileId", 
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		  });
	}
  }
  InventoryPermissions.init(
		{
			permissionId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			inventoryId: {
				type: DataTypes.INTEGER,
				references: {
					model: "Inventories",
					key: "inventoryId",
					onDelete: "CASCADE",
				},
			},
			permittedUser: {
				type: DataTypes.INTEGER,
				references: {
					model: "UserProfiles",
					key: "profileId",
					onDelete: "CASCADE",
				},
			},
			accessLevel: {
				type: DataTypes.INTEGER,
				references: {
					model: "Permissions",
					key: "accessId",
					onDelete: "CASCADE",
				},
			},
		},
		{
			sequelize,
			modelName: "InventoryPermissions",
			timestamps: false,
			hooks:{
				afterDestroy: async () => {
					try {
					  await sequelize.query(`ALTER TABLE InventoryPermissions AUTO_INCREMENT = 1`);
					} catch (error) {
					  console.error('Error resetting AUTO_INCREMENT:', error);
					}
				  }
			}
		},
    {
    sequelize,
    modelName: 'InventoryPermissions',
	timestamps: false,
  });
  return InventoryPermissions;
};