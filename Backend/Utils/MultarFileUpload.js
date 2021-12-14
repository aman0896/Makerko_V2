var multer = require("multer");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
const util = require("util");

//single file uploads
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

//multiple file uploads
function MultipleFileUpload(fieldName, path) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage }).array(fieldName);
  return upload;
}

//multiple field uploads
function MultipleFieldUpload(fieldData) {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp/");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage }).fields(fieldData);
  return upload;
}

module.exports = { SingleFileUpload, MultipleFileUpload, MultipleFieldUpload };
