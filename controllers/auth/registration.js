const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const { BASE_URL } = process.env;

const registration = async (req, res) => {
  const { email, password } = req.body;

  const candidate = await User.findOne({ email });
  if (candidate) {
    throw new Conflict("Email in use");
  }
  // const hashPassword = await bcrypt.hash(password, 10);

  // its better to do hashing the password in sync flow
  const hashPassword = bcrypt.hashSync(password, 10, function (err) {
    res.status(400);
    throw new Error(err);
  });

  const avatarURL = gravatar.url(email);

  const verificationToken = v4();

  const user = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Email verification",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/users/verify/${verificationToken}"> Please, click for email verification </a>`,
  };

  await sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL,
    },
  });
};

module.exports = registration;
