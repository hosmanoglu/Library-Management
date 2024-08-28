"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Book extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			Book.hasMany(models.BookViewing, { targetKey: "bookId", foreignKey: "bookId" });
		}
	}
	Book.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "Book",
			tableName: "books",
		}
	);
	return Book;
};

