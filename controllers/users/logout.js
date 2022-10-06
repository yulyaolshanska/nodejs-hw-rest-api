const { Unauthorized } = require("http-errors");

const { User } = require("../../models/users");

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById({ _id });
    if (!user) {
      throw new Unauthorized("Not authorized");
    }
    await User.findByIdAndUpdate(user.id, { token: null });
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
