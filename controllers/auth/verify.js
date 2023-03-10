const { User } = require("../../models/user");
const { NotFound } = require("http-errors");

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  console.log(typeof verificationToken);

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new NotFound("User not found");
  }

  await User.findOneAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.status(200).json({
    message: "Verification successful",
  });
};

module.exports = verify;
