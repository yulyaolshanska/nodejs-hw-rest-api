const { Unauthorized } = require("http-errors");
const { User } = require("../../models/users");

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById({ _id });
  if (!user) {
    throw new Unauthorized("Not authorized");
  }
  await User.findByIdAndUpdate(user.id, { token: null });
  res.status(204).json();
};

module.exports = logout;
