const { User } = require("../../models/users");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const avatarURL = gravatar.url(email);
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ email, password: hashPassword, avatarURL });
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
