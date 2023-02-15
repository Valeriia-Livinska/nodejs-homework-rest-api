const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const addedContact = await Contact.create(req.body);
  res.json({
    status: "created",
    code: 201,
    data: {
      result: addedContact,
    },
  });
};

module.exports = add;
