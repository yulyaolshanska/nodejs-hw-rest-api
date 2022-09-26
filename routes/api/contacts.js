const express = require("express");

// const { validation } = require("../../middlewars/validation");
// const { contactSchema } = require("../../schemas/index");
// const validateMiddleware = validation(contactSchema);
const router = express.Router();
const isValidId = require("../../middlewars/IsValidId");

const { contacts } = require("../../controllers/index");
router.get("/", contacts.getAll);

router.get("/:contactId", isValidId, contacts.getById);

router.post("/", contacts.add);

router.delete("/:contactId", isValidId, contacts.removeById);

router.put("/:contactId", isValidId, contacts.updateById);

module.exports = router;
