const createError = require("http-errors");
// const { NotFound } = require("http-errors");

const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const foundContact = await Contact.findById(contactId);
  if (!foundContact) {
    // var 1 with NotFound from http-errors
    // throw new NotFound(`Contact with id ${contactId} not found`);

    // var 2 with create error http-errors
    throw createError(404, `Contact with id ${contactId} not found`);

    // var 3 handwritten
    // const error = new Error(`Contact with id ${contactId} not found`);
    // error.status = 404;
    // throw error;
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result: foundContact,
    },
  });
};

module.exports = getById;
