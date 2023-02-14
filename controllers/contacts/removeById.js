const createError = require("http-errors");

const { Contact } = require("../../models/contact");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await Contact.findByIdAndRemove(contactId);
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
