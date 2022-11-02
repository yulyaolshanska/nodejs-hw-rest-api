const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner: req.user._id,
  });
  if (!result) {
    throw RequestError(404, `Contact with id ${contactId} not found`);
  }
  res.json({ status: "success", message: "contact deleted", data: result });
};

module.exports = removeById;
