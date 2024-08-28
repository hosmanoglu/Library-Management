const express = require("express");
const { getBooks, getBook,createBook } = require("../services/bookService");
const router = express.Router();

router.get("/books/:id",getBook);
router.get("/books",getBooks);
router.post("/books",createBook);

module.exports = router;

