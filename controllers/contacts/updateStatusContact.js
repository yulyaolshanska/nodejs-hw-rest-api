const { Contact } = require("../../models/contact");
const Joi = require("joi");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
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
