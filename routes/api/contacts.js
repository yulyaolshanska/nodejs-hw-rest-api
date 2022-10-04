const express = require("express");
const { validation } = require("../../middlewars");
const {
  addContactSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contactsSchemas");
const router = express.Router();
const isValidId = require("../../middlewars/IsValidId");

const { contacts } = require("../../controllers/index");
router.get("/", contacts.getAll);

router.get("/:contactId", isValidId, contacts.getById);

router.post("/", validation(addContactSchema), contacts.add);

router.delete("/:contactId", isValidId, contacts.removeById);

router.put(
  "/:contactId",
  isValidId,
  validation(updateSchema),
  contacts.updateById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(updateFavoriteSchema),
  contacts.updateStatusContact
);

module.exports = router;
