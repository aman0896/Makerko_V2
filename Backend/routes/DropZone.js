const express = require("express");
const { SingleFileUpload } = require("../Utils/MultarFileUpload");
const router = express.Router();
var fs = require("fs");

const path = require("path");
const projectPath = path.dirname(process.cwd());
console.log(projectPath, "path");

router.post("/file-drop", (req, res) => {
    const upload = SingleFileUpload("file", null);
    // const dir = "./public/uploads/customer/file";
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, { recursive: true });
    // }
    upload(req, res, (err) => {
        if (err) {
            return console.log(err, "error");
        } else {
            res.json({ fileDetails: req.file });
        }
    });
});

module.exports = router;
