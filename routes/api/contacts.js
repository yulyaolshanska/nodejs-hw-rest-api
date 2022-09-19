const express = require("express");

// const { validation } = require("../../middlewars/validation");
// const { contactSchema } = require("../../schemas/index");
// const validateMiddleware = validation(contactSchema);
const router = express.Router();

const { contacts } = require("../../controllers/index");
router.get("/", contacts.getAll);

router.get("/:contactId");

router.post("/", contacts.add);

router.delete("/:contactId", contacts.removeById);

router.put("/:contactId", contacts.updateById);

module.exports = router;
