const fs = require("fs/promises");
const path = require("node:path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts(contactsPath);
    const searchedContact = contactsArr.find((obj) => obj.id === contactId);
    if (!searchedContact) {
      return null;
    }
    return searchedContact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const contactsArr = await listContacts(contactsPath);
    const updatedArr = contactsArr.filter((obj) => obj.id !== contactId);
    const updatedData = JSON.stringify(updatedArr, null, 4);
    await fs.writeFile(contactsPath, updatedData);
    return updatedData;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contactsArr = await listContacts(contactsPath);
    const contactToAdd = {
      id: uuidv4(),
      name,
      email,
      phone,
    };
    contactsArr.push(contactToAdd);
    const updatedData = JSON.stringify(contactsArr, null, 4);
    await fs.writeFile(contactsPath, updatedData);
    return contactToAdd;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contactsArr = await listContacts(contactsPath);
    const contactToUpdate = contactsArr.find(
      (contact) => contact.id === contactId);
    if (name) {
      contactToUpdate.name = name;
    }
    if (email) {
      contactToUpdate.email = email;
    }
    if (phone) {
      contactToUpdate.phone = phone;
    }
    return contactToUpdate;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
