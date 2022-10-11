const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + req.user._id);
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
