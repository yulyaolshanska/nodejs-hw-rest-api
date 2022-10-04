const express = require("express");
const { users } = require("../../controllers/index");

const router = express.Router();

router.post("/users/signup", users.register);

module.exports = router;
