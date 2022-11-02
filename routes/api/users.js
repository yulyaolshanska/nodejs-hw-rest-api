const express = require("express");
const { users } = require("../../controllers");
const { validation, auth, upload } = require("../../middlewars");
const {
  joiRegisterSchema,
  joiLoginSchema,
  validationSchema,
} = require("../../models/users");
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(users.getCurrent));
router.patch("/", auth, ctrlWrapper(users.updateSubscription));

router.post(
  "/signup",
  validation(joiRegisterSchema),
  ctrlWrapper(users.register)
);
router.post("/signin", validation(joiLoginSchema), ctrlWrapper(users.login));
router.get("/verify/:verificationToken", ctrlWrapper(users.verifyEmail));
router.post(
  "/verify",
  validation(validationSchema),
  ctrlWrapper(users.resendVerifyEmail)
);
router.post("/logout", auth, ctrlWrapper(users.logout));
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(users.updateAvatar)
);

module.exports = router;
