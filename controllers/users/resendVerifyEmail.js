const { User } = require("../../models/users");
const { NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    res.status(400).json({ messsage: "Verification has already been passed" });
  }

  const msg = {
    to: email,
    subject: "Confirm your email",
    html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}">Click to confirm your email</a>`,
  };

  await sendEmail(msg);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
