"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class UserProfiles extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			UserProfiles.belongsTo(models.UserAccounts, {
				foreignKey: "profileId",
				targetKey: "userId",
				as: "profileAccount",
				onDelete: "CASCADE",
			});

			UserProfiles.hasMany(models.RecordPermissions, {
				foreignKey: "permittedUser",
				sourceKey: "profileId",
				as: "profilePermission",
				onDelete: "CASCADE",
			});
		}
	}
	UserProfiles.init(
		{
			profileId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				references: {
					model: "UserAccounts",
					key: "userId",
				},
				onDelete: "CASCADE",
			},
			userName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 25],
				},
			},
			contactNumber: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					is: /^[0-9\-\+\s]*$/,
					len: [7, 15],
				},
			},
			secondaryEmail: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isEmail: true,
				},
			},
			country: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z\s\-\']*$/i,
					len: [3, 25],
				},
			},
			jobTitle: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [3, 25],
				},
			},
			organization: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 50],
				},
			},
			department: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 50],
				},
			},
			street: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 50],
				},
			},
			city: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 50],
				},
			},
			state: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 50],
				},
			},
			postal: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					is: /^[a-zA-Z0-9\s\-\']*$/i,
					len: [2, 50],
				},
			},
			birthday: {
				type: DataTypes.DATE,
				allowNull: true,
				validate: {
					isDate: true,
				},
			},
			gender: {
				type: DataTypes.ENUM("Male", "Female", "Other"),
				allowNull: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: "UserProfiles",

			hooks: {
				beforeCreate: async (user) => {
					if (user.country)
						user.country = user.country.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.jobTitle)
						user.jobTitle = user.jobTitle.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.organization)
						user.organization = user.organization.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.department)
						user.department = user.department.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.street)
						user.street = user.street.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.city)
						user.city = user.city.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.state)
						user.state = user.state.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.postal)
						user.postal = user.postal.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.gender)
						user.gender = user.gender.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
				},
				beforeUpdate: async (user) => {
					if (user.country)
						user.country = user.country.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.jobTitle)
						user.jobTitle = user.jobTitle.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.organization)
						user.organization = user.organization.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.department)
						user.department = user.department.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.street)
						user.street = user.street.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.city)
						user.city = user.city.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.state)
						user.state = user.state.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.postal)
						user.postal = user.postal.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
					if (user.gender)
						user.gender = user.gender.replace(/\b\w/g, (char) =>
							char.toUpperCase()
						);
				},
				afterDestroy: async () => {
					try {
						await sequelize.query(
							`ALTER TABLE UserProfiles AUTO_INCREMENT = 1`
						);
					} catch (error) {
						console.error("Error resetting AUTO_INCREMENT:", error);
					}
				},
			},
		}
	);
	return UserProfiles;
};
