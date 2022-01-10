const express = require("express");
const router = express.Router();
const { MultipleFieldUpload } = require("../Utils/MultarFileUpload");

router.post("/create", (req, res) => {
  const upload = MultipleFieldUpload([
    { name: "mainPhoto" },
    { name: "otherPhotos" },
    { name: "pdfDocument" },
  ]);

  upload(req, res, (err) => {
    if (err) {
      console.log(err, "This is error");
    } else {
      console.log(req.file, "Files");
    }
  });
});

module.exports = router;
