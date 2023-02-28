const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    cb(null, originalname);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
