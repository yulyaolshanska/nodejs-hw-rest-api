const { User } = require("../../models/users");

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id, email } = req.user;
    await User.findOneAndUpdate(
      { _id: _id },
      { subscription },
      {
        new: true,
      }
    );

    res.json({
      status: "success",
      data: { email, subscription },
    });
};

module.exports = updateSubscription;
