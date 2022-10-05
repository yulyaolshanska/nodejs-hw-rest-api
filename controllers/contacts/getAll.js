const { Contact } = require("../../models/contact");

const getAll = async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  try {
    const contactList = await Contact.find({ owner: _id }, "", {
      skip,
      limit: Number(limit),
    }).populate("owner", "_id email subscription");
    res
      .status(200)
      .json({ status: "success", code: 200, data: { result: contactList } });
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;
