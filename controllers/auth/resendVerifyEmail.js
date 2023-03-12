const { BadRequest, NotFound } = require("http-errors");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequest("Missing required field email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound(`User with the email ${email} was not found`);
  }

  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }

  const resendVerifyEmail = {
    to: email,
    subject: "Resending of email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${user.verificationToken}"> Please, click for email verification </a>`,
  };

  await sendEmail(resendVerifyEmail);

  res.status(200).json({
    message: "Verification email resent",
  });
};

module.exports = resendVerifyEmail;
