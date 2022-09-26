const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");
const {
  handleSchemaValidationErrors,
} = require("../helpers/handleSchemaValidationErrors");
const { Schema, model } = require("mongoose");
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

const filePath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  const contact = contacts.find((it) => it.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return removeContact;
};

const addContact = async (body) => {
  const newContact = { ...body, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { ...body, id: contactId };
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  Contact,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
