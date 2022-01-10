const express = require("express");
const { DBQuery2 } = require("../DBController/DatabaseQuery");
const router = express.Router();

router.post("/create", (req, res) => {
    console.log(req.body, "body");
    console.log(req.file, "file");
});

//get all feature_project from db
// router.get("/get-featureproject-list", async (req, res) => {
//     const sqlQuery = "SELECT * FROM feature_project";
//     const data = await DBQuery2(sqlQuery);
//     console.log(data, "data");
//     res.json(data);
// });

//get all feature_project from db
router.get("/get-featureproject-list", async (req, res) => {
    const sqlQuery = "SELECT * FROM project";
    const data = await DBQuery2(sqlQuery);
    console.log(JSON.parse(data[0].Content)[0], "data");
    res.json(data);
});
module.exports = router;
