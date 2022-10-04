const User = require("../../models/users");
const { Conflict } = require("http-errors");

const register = async (req, res) => {
  console.log("request", req);
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return new Conflict("Email in use");
  }
  const result = await User.create({ ...req.body, password });
  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = register;
