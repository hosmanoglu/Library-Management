const db = require("../models");
const Joi = require("joi");

async function getBooks(req, res, next) {
	try {
		let books = await db.Book.findAll();
		res.json(books);
	} catch (e) {
		console.log(e);
		next(e);
	}
}
async function getBook(req, res, next) {
	try {
		let book = await db.Book.findByPk(req.params.id, {
			attributes: [
				"id",
				"name",
				[
					db.sequelize.fn("ROUND", db.sequelize.fn("AVG", db.sequelize.col("BookViewings.user_score")), 2),
					"score",
				],
			],

			include: [
				{
					model: db.BookViewing,
					attributes: [],
				},
			],
			group: ["Book.id"],
		});

		if (!book) {
			res.status(404).json({ message: "book not found" });
			return;
		}
		book.score;
		res.json(book);
	} catch (e) {
		console.log(e);
		next(e);
	}
}

const bookValidator = Joi.object({ name: Joi.string().required() });
async function createBook(req, res, next) {
	try {
		Joi.attempt(req.body, bookValidator);
		let book = await db.Book.create(req.body);
		res.json(book);
	} catch (e) {
		console.log(e);
		next(e);
	}
}

module.exports = {
	getBooks,
	getBook,
	createBook,
};
