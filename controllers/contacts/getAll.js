const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;

  // to know the exact search value
  const favoriteValue = favorite;

  const contactsList = favorite
    ? await Contact.find(
        { owner, favorite: favoriteValue },
        "-createdAt -updatedAt",
        {
          skip,
          limit,
        }
      ).populate("owner", "email")
    : await Contact.find({ owner }, "-createdAt -updatedAt", {
        skip,
        limit,
      }).populate("owner", "email");

  res.json({
    status: "success",
    code: 200,
    data: {
      result: contactsList,
    },
  });
};

module.exports = getAll;
