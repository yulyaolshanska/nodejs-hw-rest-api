const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res, next) => {
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
      const error = new Error(`missing field favorite`);
      error.status = 400;
      throw error;
    }

    res.status(200).json({ status: " success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
