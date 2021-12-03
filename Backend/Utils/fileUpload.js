var multer = require("multer");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());

function SingleFileUpload(fieldName, filePath) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/temp/");
        },
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + Date.now() + path.extname(file.originalname)
            );
        },
    });
    const upload = multer({ storage: storage }).single(fieldName);
    return upload;
}

function MultipleFileUpload(fieldName, path) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "./public/temp/");
        },
        filename: function (req, file, cb) {
            cb(
                null,
                file.fieldname + Date.now() + path.extname(file.originalname)
            );
        },
    });
    const upload = multer({ storage: storage }).array(fieldName);
    return upload;
}

module.exports = { SingleFileUpload, MultipleFileUpload };
