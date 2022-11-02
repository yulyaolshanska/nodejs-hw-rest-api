const { Unauthorized, Forbidden } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../../models/users");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Email or password is wrong");
  }
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!passCompare) {
    throw new Unauthorized("Email or password is wrong");
  }
  if (!user.verify) {
    throw new Forbidden("Email not verified");
  }
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    token,
    user: {
      email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
