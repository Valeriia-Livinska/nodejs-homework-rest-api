const { addContact } = require("../../models/contacts");

const add = async (req, res) => {
  const addedContact = await addContact(req.body);
  res.json({
    status: "created",
    code: 201,
    data: {
      result: addedContact,
    },
  });
};

module.exports = add;
