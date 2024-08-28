const express = require("express");
const { borrowBook, returnBook } = require("../services/bookViewingService");
const router = express.Router();

router.post("/users/:userId/borrow/:bookId", borrowBook);
router.post("/users/:userId/return/:bookId", returnBook);

module.exports = router;

