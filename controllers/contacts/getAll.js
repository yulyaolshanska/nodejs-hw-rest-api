const contactOperations = require("../../models/contacts");

const getAll = async (req, res, next) => {
  try {
    const contactList = await contactOperations.listContacts();
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result: contactList } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
