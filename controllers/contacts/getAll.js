// const contactOperations = require("../../models/contact");
const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  try {
    const contactList = await Contact.find({});
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result: contactList } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
