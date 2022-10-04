const express = require("express");
const { users } = require("../../controllers/index");
const { validation } = require("../../middlewars");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/users");

const router = express.Router();

router.post("/signup", validation(joiRegisterSchema), users.register);
router.post("/signin", validation(joiLoginSchema), users.login);

module.exports = router;
