const { User } = require("../../models/user");
const { Unauthorized } = require("http-errors");

const logout = async (req, res) => {
  const { _id: contactId } = req.user;
  const user = await User.findByIdAndUpdate(contactId, { token: null });
  if (!user) {
    throw new Unauthorized("Not authorized");
  }

  res.status(204).json();
};

module.exports = logout;
