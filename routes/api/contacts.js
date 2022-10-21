const express = require("express");
const { validation, auth, isValidId } = require("../../middlewars");
const {
  addContactSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchemas");
const router = express.Router();

const { contacts } = require("../../controllers/index");
router.get("/", auth, contacts.getAll);

router.get("/:contactId", auth, isValidId, contacts.getById);

router.post("/", auth, validation(addContactSchema), contacts.add);

router.delete("/:contactId", auth, isValidId, contacts.removeById);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validation(updateSchema),
  contacts.updateById
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(updateFavoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
