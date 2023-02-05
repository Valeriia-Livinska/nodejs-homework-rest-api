const { listContacts } = require("../../models/contacts");

const getAll = async (req, res) => {
  const contactsList = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsList,
    },
  });
};

module.exports = getAll;
