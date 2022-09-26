const contactOperations = require("../../models/contact");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperations.getContactById(contactId);
    console.log(result);
    if (!result) {
      const error = new Error(`Contact with id ${contactId} not found`);
      error.status = 404;
      throw error;
    }

    res.status(200).json({ status: "success", code: 200, data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
