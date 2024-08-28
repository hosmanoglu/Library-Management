module.exports = (err, req, res, next) => {
	if (err.isJoi) {
		res.status(400).json({ message: "bad request" });
		return;
	}

	res.status(500).json({ message: "internal server error" });
};
