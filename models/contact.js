const {
  handleSchemaValidationErrors,
} = require("../helpers/handleSchemaValidationErrors");
const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = Schema(
  {
    name: { type: String, required: [true, "Set name for contact"] },
    email: { type: String },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
      unique: true,
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },
  },
  {
    writeConcern: {
      w: "majority",
      j: true,
      wtimeout: 1000,
    },
  }
);

contactSchema.post("save", handleSchemaValidationErrors);

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
};
