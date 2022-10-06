const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndUpdate(
      { _id: contactId, owner: req.user._id },
      req.body,
      {
        new: true,
      }
    );
    if (!result) {
      const error = new Error(`Contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.status(200).json({ status: " success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateById;
