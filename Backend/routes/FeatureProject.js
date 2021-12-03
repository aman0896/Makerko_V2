const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  console.log(req.body, "body");
  console.log(req.file, "file");
});

module.exports = router;
