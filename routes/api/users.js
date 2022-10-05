const express = require("express");
const { users } = require("../../controllers");
const { validation, auth } = require("../../middlewars");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/users");

const router = express.Router();

router.get("/current", auth, users.getCurrent);

router.post("/signup", validation(joiRegisterSchema), users.register);
router.post("/signin", validation(joiLoginSchema), users.login);
router.post("/logout", auth, users.logout);

module.exports = router;
