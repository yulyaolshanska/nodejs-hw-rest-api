const { User } = require("../../models/users");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const verificationToken = v4();
    await User.create({
      email,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const msg = {
      to: email,
      subject: "Confirm your email",
      html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm your email</a>`,
    };
    await sendEmail(msg);

    res.status(201).json({
      user: {
        email,
        subscription: "starter",
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;
