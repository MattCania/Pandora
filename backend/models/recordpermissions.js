"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class RecordPermissions extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			RecordPermissions.belongsTo(models.Permissions, {
				foreignKey: "accessLevel",
				targetKey: "accessId",
				as: "userAccess",
				onDelete: 'CASCADE',
    		    onUpdate: 'CASCADE'
			});

			RecordPermissions.belongsTo(models.TransactionRecords, {
				foreignKey: "recordId",
				targetKey: 'recordId',
				as: "transactionPermission",
				onDelete: 'CASCADE',
    		    onUpdate: 'CASCADE'
			});


			RecordPermissions.belongsTo(models.UserProfiles, {
				foreignKey: "permittedUser",
				targetKey: "profileId",
				as: "userProfiles", 
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE'
			  });
		}
	}
	RecordPermissions.init(
		{
			permissionId: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			recordId: {
				type: DataTypes.INTEGER,
				references: {
					model: "TransactionRecords",
					key: "recordId",
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
			modelName: "RecordPermissions",
			timestamps: false,
			hooks:{
				afterDestroy: async () => {
					try {
					  await sequelize.query(`ALTER TABLE RecordPermissions AUTO_INCREMENT = 1`);
					} catch (error) {
					  console.error('Error resetting AUTO_INCREMENT:', error);
					}
				  }
			}
		}
	);
	return RecordPermissions;
};
