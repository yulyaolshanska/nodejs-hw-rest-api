const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw RequestError(400, "Missing field favorite");
  }

  res.json({ status: " success", code: 200, data: { result } });
};

module.exports = updateStatusContact;
