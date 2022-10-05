const { Contact } = require("../../models/contact");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findOneAndDelete({
      _id:contactId,
      owner: req.user._id,
    });
    if (!result) {
      const error = new Error(`Contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
    }
    res
      .status(200)
      .json({ status: "success", message: "contact deleted", data: result });
  } catch (error) {
    next(error);
  }
};

module.exports = removeById;
