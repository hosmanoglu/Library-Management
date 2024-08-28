const db = require("../models/");
const Joi = require("joi");
const [BORROWED, RETUREND] = db.BookViewing.rawAttributes.state.values;

async function getUsers(req, res, next) {
	try {
		let users = await db.User.findAll();
		res.json(users);
	} catch (e) {
		console.log(e);
		next(e);
	}
}
async function getUser(req, res, next) {
	try {
		let userId = req.params.id;
		let user = await db.User.findByPk(userId, { attributes: ["id", "name"] });

		if (!user) {
			res.status(404).json({ message: "user not found" });
			return;
		}

		let userBookViews = await db.BookViewing.findAll({
			where: { userId },
			attributes: ["Book.name", "userScore", "state"],
			include: [
				{
					attributes: ["name"],
					model: db.Book,
				},
			],
		});

		let books = userBookViews.reduce(
			(result, userBookView) => {
				if (userBookView.state === RETUREND) {
					result.past.push({ name: userBookView.Book.name, userScore: userBookView.userScore });
				} else if (userBookView.state === BORROWED) {
					result.present.push({ name: userBookView.Book.name });
				}

				return result;
			},
			{ past: [], present: [] }
		);
		res.json({ user, books });
	} catch (e) {
		console.log(e);
		next(e);
	}
}
const userValidator = Joi.object({ name: Joi.string().required() });
async function createUser(req, res, next) {
	try {
		Joi.attempt(req.body, userValidator);
		let user = await db.User.create(req.body);
		res.json(user);
	} catch (e) {
		console.log(e);
		next(e);
	}
}

module.exports = {
	getUsers,
	getUser,
	createUser,
};
