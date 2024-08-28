const express = require("express");
const { getUsers, getUser,createUser } = require("../services/userService");
const router = express.Router();

router.get("/users/:id",getUser);
router.get("/users",getUsers);
router.post("/users",createUser);

module.exports = router;

