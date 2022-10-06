const { User } = require("../../models/users");

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;
  try {
    await User.findOneAndUpdate(
      { _id: _id },
      { subscription },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      code: "200",
      data: { email, subscription },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = updateSubscription;
