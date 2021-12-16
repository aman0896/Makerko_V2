const express = require("express");
const {
    SingleFileUpload,
    MultipleFieldUpload,
} = require("../Utils/MultarFileUpload");
const router = express.Router();
var fs = require("fs");

const path = require("path");
const FileDelete = require("../Utils/FileDelete");
const projectPath = path.dirname(process.cwd());
console.log(projectPath, "path");

router.post("/file-drop", (req, res) => {
    const upload = MultipleFieldUpload([
        {
            name: "file",
            maxCount: 1,
        },
        {
            name: "productFile",
            maxCount: 1,
        },
        {
            name: "sketchFile",
            maxCount: 1,
        },
    ]);
    // const dir = "./public/uploads/customer/file";
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir, { recursive: true });
    // }
    upload(req, res, (err) => {
        if (err) {
            return console.log(err, "error");
        } else {
            console.log(req.files, "files");
            res.json({ fileDetails: req.files });
        }
    });
});

//#region delete uploadedfile
router.delete("/file-delete", async (req, res) => {
    let filePath = req.query.path;
    const isDelete = await FileDelete(filePath);
    if (isDelete) {
        res.json({ filedelete: "success" });
        return;
    } else {
        res.json({ filedelete: "fail" });
        return;
    }
});
//#endregion

module.exports = router;
