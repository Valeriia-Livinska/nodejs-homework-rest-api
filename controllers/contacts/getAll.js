const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const contactsList = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsList,
    },
  });
};

module.exports = getAll;
