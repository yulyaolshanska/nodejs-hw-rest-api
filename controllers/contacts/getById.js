const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw RequestError(404, `Contact with id ${contactId} not found`);
      // const error = new Error(`Contact with id ${contactId} not found`);
      // error.status = 404;
      // throw error;
    }

    res.json({ status: "success", data: { result } });
  } catch (error) {
    next(error);
  }
};

module.exports = getById;
