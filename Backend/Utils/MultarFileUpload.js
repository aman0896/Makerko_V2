var multer = require("multer");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
const util = require("util");

function SingleFileUpload(fieldName, filePath) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage }).single(fieldName);
  return upload;
}

function MultipleFileUpload(fieldName, filepath) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage }).array("profile", 5);

  return upload;
}

module.exports = { SingleFileUpload, MultipleFileUpload };
