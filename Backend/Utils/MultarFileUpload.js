var multer = require("multer");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
const util = require("util");
const fs = require("fs");

//single file uploads
function SingleFileUpload(fieldName, filePath) {
    try {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                try {
                    let dir = "./public/temp/";
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    cb(null, dir);
                } catch {}
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    file.fieldname +
                        Date.now() +
                        path.extname(file.originalname)
                );
            },
        });
        const upload = multer({ storage: storage }).single(fieldName);
        return upload;
    } catch {}

    return upload;
}

//multiple file uploads
function MultipleFileUpload(fieldName, filepath) {
    try {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                try {
                    let dir = "./public/temp/";
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    cb(null, dir);
                } catch {}
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    file.fieldname +
                        Date.now() +
                        path.extname(file.originalname)
                );
            },
        });
        const upload = multer({ storage: storage }).array(fieldName);
        return upload;
    } catch {}
}

//multiple field uploads
function MultipleFieldUpload(fieldData) {
    try {
        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                try {
                    let dir = "./public/temp/";
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    cb(null, dir);
                } catch {}
            },
            filename: function (req, file, cb) {
                cb(
                    null,
                    file.fieldname +
                        Date.now() +
                        path.extname(file.originalname)
                );
            },
        });
        const upload = multer({ storage: storage }).fields(fieldData);
        return upload;
    } catch {}
}

module.exports = { SingleFileUpload, MultipleFileUpload, MultipleFieldUpload };
