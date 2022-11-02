const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const contactList = await Contact.find(
    favorite ? { owner: _id, favorite } : { owner: _id },
    "",
    {
      skip,
      limit,
    }
  ).populate("owner", "_id email subscription");
  res.json({ status: "success", data: { result: contactList } });
};

module.exports = getAll;
