"use strict";
const { Model, ENUM } = require("sequelize");
const Book = require("./book");
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
	class BookViewing extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			BookViewing.belongsTo(models.Book, { targetKey: "id", foreignKey: "bookId" });
			BookViewing.belongsTo(models.User, { targetKey: "id", foreignKey: "userId" });
		}
	}
	BookViewing.init(
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER,
			},
			bookId: {
				type: DataTypes.INTEGER,
				references: {
					model: Book,
					key: "id",
				},
			},
			userId: {
				type: DataTypes.INTEGER,
				references: {
					model: User,
					key: "id",
				},
			},
			state: {
				type: ENUM("borrowed", "returned"),
				defaultValue: "borrowed",
			},
			userScore: {
				type: DataTypes.SMALLINT,
				defaultValue: 0,
			},
		},
		{
			sequelize,
			modelName: "BookViewing",
			tableName: "book_viewings",
		}
	);
	return BookViewing;
};

