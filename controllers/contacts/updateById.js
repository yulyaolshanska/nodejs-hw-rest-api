const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: req.user._id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw RequestError(404, `Contact with id ${contactId} not found`);
  }
  res.json({ status: " success", code: 200, data: { result } });
};

module.exports = updateById;
