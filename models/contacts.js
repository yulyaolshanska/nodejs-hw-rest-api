const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

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

const removeContact = async (contactId) => {};

const addContact = async (body) => {
  const newContact = { ...body, id: v4() };
  const contacts = await listContacts();
  contacts.push(newContact);
  fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
