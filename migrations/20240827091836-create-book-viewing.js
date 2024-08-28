"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable("book_viewings", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			book_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "books",
					key: "id",
				},
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: "users",
					key: "id",
				},
			},
			state: {
				type: Sequelize.ENUM("borrowed", "returned"),
				defaultValue: "borrowed",
				allowNull: false,
			},
			user_score: {
				type: Sequelize.SMALLINT,
				defaultValue: 0,
			},
			created_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updated_at: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("book_viewings");
	},
};

