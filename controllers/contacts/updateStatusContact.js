const createError = require("http-errors");

const { Contact } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  // check if req.body is not empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    throw createError(
      400,
      "Missing field favorite. Please add field to update"
    );
  }

  const { contactId } = req.params;
  const { favorite } = req.body;
  const updatedStatusContact = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!updatedStatusContact) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result: updatedStatusContact,
    },
  });
};

module.exports = updateStatusContact;
