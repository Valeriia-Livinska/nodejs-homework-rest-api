const createError = require("http-errors");

const { removeContact } = require("../../models/contacts");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await removeContact(contactId);
  if (!deletedContact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result: deletedContact,
    },
  });
};

module.exports = removeById;
