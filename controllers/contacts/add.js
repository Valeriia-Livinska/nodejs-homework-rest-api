const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const addedContact = await Contact.create({ ...req.body, owner });
  
  res.json({
    status: "created",
    code: 201,
    data: {
      result: addedContact,
    },
  });
};

module.exports = add;
