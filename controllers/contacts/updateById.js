const createError = require("http-errors");

const { updateContact } = require("../../models/contacts");

const updateById = async (req, res) => {
  // check if req.body is not empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw createError(400, "Missing fields. Please add fields to update");
  }

  const { contactId } = req.params;
  const updatedContact = await updateContact(contactId, req.body);
  if (!updatedContact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: updatedContact,
    },
  });
};

module.exports = updateById;
