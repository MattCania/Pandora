"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class UserRoles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// Foreign Key in use
			UserRoles.belongsTo(models.UserAccounts, {
				foreignKey: "userId",
				targetKey: "userId",
				as: "userRoleId",
				onDelete: "CASCADE",
			});

			UserRoles.belongsTo(models.Roles, {
				foreignKey: "roleId",
				targetKey: 'roleId',
				as: "userRole",
				onDelete: "CASCADE",
			});
		}
	}
	UserRoles.init(
		{
			roleId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				references: {
					model: "Roles",
					key: "roleId",
				},
				onDelete: "CASCADE",
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: "UserAccounts",
					key: "userId",
				},
				onDelete: "CASCADE",
			},
		},
		{
			sequelize,
			modelName: "UserRoles",
			timestamps: false,
			hooks:{
				afterDestroy: async () => {
					try {
					  await sequelize.query(`ALTER TABLE UserRoles AUTO_INCREMENT = 1`);
					} catch (error) {
					  console.error('Error resetting AUTO_INCREMENT:', error);
					}
				  }
			}
		}
	);
	return UserRoles;
};
