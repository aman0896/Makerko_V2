const express = require("express");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
var fs = require("fs");
const {
  SingleFileUpload,
  MultipleFileUpload,
} = require("../Utils/MultarFileUpload");
const FileDownload = require("../Utils/FileDownload");
const router = express.Router();

router.post("/customer", (req, res) => {
  console.log("profile check");
  const upload = SingleFileUpload("profile", null);
  const dir = "./public/uploads/customer/";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  upload(req, res, (err) => {
    if (err) {
      console.log(err, "error");
    } else {
      console.log(req.file, "pathhhhdsc");
      var tmp_path = req.file.path;
      var target_path =
        "./public/uploads/customer/" +
        req.file.fieldname +
        Date.now() +
        path.extname(req.file.originalname);

      /** A better way to copy the uploaded file. **/
      var src = fs.createReadStream(tmp_path);
      var dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on("end", function () {
        console.log("complete");
      });
      src.on("error", function (err) {
        console.log("error");
      });
      src.on("close", function (err) {
        fs.unlink(tmp_path, function (err) {
          console.log(err);
        });
      });
    }
  });
});
router.post("/multiple-upload", async (req, res) => {
  console.log("profile check");
  const upload = MultipleFileUpload("profile", null);
  const dir = "./public/uploads/multipleUpload/";
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  upload(req, res, (err) => {
    if (err) {
      console.log(err, "error");
    } else {
      console.log(req.files, "req");
      const files = req.files;
      for (let i = 0; i < files.length; i++) {
        let tmp_path = files[i].path;
        console.log(tmp_path, "path");
        let target_path =
          "./public/uploads/multipleUpload/" + files[i].filename;
        let src = fs.createReadStream(tmp_path);
        let dest = fs.createWriteStream(target_path);
        src.pipe(dest);
        src.on("end", function () {
          console.log("complete");
        });
        src.on("error", function (err) {
          console.log("error");
        });
        src.on("close", function (err) {
          console.log(tmp_path, "path");
          fs.unlink(tmp_path, function (err) {
            console.log(err);
          });
        });
      }

      //onsole.log(req.file.path, "pathhhh");
      //   var tmp_path = req.file.path;
      //   var target_path =
      //     "./public/uploads/customer/" +
      //     req.file.fieldname +
      //     Date.now() +
      //     path.extname(req.file.originalname);

      //   /** A better way to copy the uploaded file. **/
      //   var src = fs.createReadStream(tmp_path);
      //   var dest = fs.createWriteStream(target_path);
      //   src.pipe(dest);
      //   src.on("end", function () {
      //     console.log("complete");
      //   });
      //   src.on("error", function (err) {
      //     console.log("error");
      //   });
      //   src.on("close", function (err) {
      //     fs.unlink(tmp_path, function (err) {
      //       console.log(err);
      //     });
      //   });
    }
  });
});

// Start download any File or images
router.post("/download", async function (req, res) {
  const path = req.body.filedir;
  const filedir = `${path}`;
  const file = await FileDownload(filedir);
  console.log(file, "file");
  if (file) {
    res.download(file); // Set disposition and send it.
    return;
  }
});
// End download any File or images

module.exports = router;
