const path = require("path");
const multer = require("multer");
const { IMAGE_PATH } = require("../constants");
const mimetypes = ["image/png", "image/jpeg"];


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "..", IMAGE_PATH));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (mimetypes.includes(file.mimetype) === false) {
    return cb(new Error("Wrong type file"));
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports.singleUpload = (fieldname) => upload.single(fieldname);
