const db = require("../models");
const Joi = require("joi");
const [BORROWED, RETUREND] = db.BookViewing.rawAttributes.state.values;

const borrowBookValidator = Joi.object({
	bookId: Joi.number().integer().required(),
	userId: Joi.number().integer().required(),
});
async function borrowBook(req, res, next) {
	try {
		let bookViewRequest = { bookId: parseInt(req.params.bookId), userId: parseInt(req.params.userId) };
		Joi.attempt(bookViewRequest, borrowBookValidator);
		let isAlreadyborrowed = await db.BookViewing.findOne({
			where: { bookId: bookViewRequest.bookId, state: BORROWED },
		});

		if (isAlreadyborrowed) {
			res.status(400).json({ message: "book already borrowed" });
			return;
		}

		let BookViewing = await db.BookViewing.create(bookViewRequest);
		res.json(BookViewing);
	} catch (e) {
		console.log(e);
		if (e.name === "SequelizeForeignKeyConstraintError") {
			res.status(400).json({ message: "book or user id incorrect" });
			return;
		}
		next(e);
	}
}

const returnBookValidator = Joi.object({
	bookId: Joi.number().integer().required(),
	userId: Joi.number().integer().required(),
	score: Joi.number().integer().min(1).max(10).required(),
});
async function returnBook(req, res, next) {
	try {
		let bookViewRequest = { bookId: parseInt(req.params.bookId), userId: parseInt(req.params.userId), ...req.body };
		Joi.attempt(bookViewRequest, returnBookValidator);
		let bookView = await db.BookViewing.findOne({
			where: { bookId: req.params.bookId, userId: req.params.userId, state: BORROWED },
		});
		if (!bookView) {
			res.status(404).json({ message: "book view not found" });
			return;
		}

		bookView.state = "returned";
		bookView.userScore = bookViewRequest.score;
		bookView.save();
		res.json(bookView);
	} catch (e) {
		console.log(e);
		next(e);
	}
}

module.exports = {
	borrowBook,
	returnBook,
};
