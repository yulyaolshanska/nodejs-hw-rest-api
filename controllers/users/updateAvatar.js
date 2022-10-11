const { User } = require("../../models/users");
const path = require("path");
const fs = require("fs").promises;
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;
  const avatarName = `${req.user._id}_${originalname}`;
  const { id } = req.user;
  console.log("id", id);
  try {
    const avatar = await Jimp.read(tmpUpload);
    avatar.resize(250, 250).write(tmpUpload);
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tmpUpload, resultUpload);
    const avatarURL = path.join("public", "avatars", avatarName);
    await User.findByIdAndUpdate(id, { avatarURL });
    const newY = await User.findById(req.user._id);
    console.log("new", newY);

    res.status(200).json({ avatarURL });
  } catch (error) {
    await fs.unlink(tmpUpload);
    next(error);
  }
};

module.exports = updateAvatar;
