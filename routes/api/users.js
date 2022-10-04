const express = require("express");
const { users } = require("../../controllers/index");
const { validation } = require("../../middlewars");
const { joiRegisterSchema } = require("../../models/users");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), users.register);

module.exports = router;
