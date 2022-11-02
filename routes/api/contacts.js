const express = require("express");
const { validation, auth, isValidId } = require("../../middlewars");
const {
  addContactSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchemas");
const router = express.Router();

const { contacts } = require("../../controllers");
const { ctrlWrapper } = require("../../helpers");

router.get("/", auth, ctrlWrapper(contacts.getAll));

router.get("/:contactId", auth, isValidId, contacts.getById);

router.post("/", auth, validation(addContactSchema), ctrlWrapper(contacts.add));

router.delete("/:contactId", auth, isValidId, ctrlWrapper(contacts.removeById));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(updateSchema),
  ctrlWrapper(contacts.updateById)
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(updateFavoriteSchema),
  ctrlWrapper(contacts.updateStatusContact)
);

module.exports = router;
