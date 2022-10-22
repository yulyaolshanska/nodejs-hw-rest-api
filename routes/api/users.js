const express = require("express");
const { users } = require("../../controllers");
const { validation, auth, upload } = require("../../middlewars");
const {
  joiRegisterSchema,
  joiLoginSchema,
  validationSchema,
} = require("../../models/users");

const router = express.Router();

router.get("/current", auth, users.getCurrent);
router.patch("/", auth, users.updateSubscription);

router.post("/signup", validation(joiRegisterSchema), users.register);
router.post("/signin", validation(joiLoginSchema), users.login);
router.get("/verify/:verificationToken", users.verifyEmail);
router.post("/verify", validation(validationSchema), users.resendVerifyEmail);
router.post("/logout", auth, users.logout);
router.patch("/avatars", auth, upload.single("avatar"), users.updateAvatar);

module.exports = router;
