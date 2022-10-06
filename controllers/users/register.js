const { User } = require("../../models/users");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    console.log("request", req);
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Conflict("Email in use");
    }
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ email, password: hashPassword });
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
