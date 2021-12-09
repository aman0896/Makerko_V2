const express = require("express");
const { DBQuery2 } = require("../DBController/DatabaseQuery");
const router = express.Router();

//fabrication method
router.get("/fabricationMethod", async (req, res) => {
    const sqlQuery = "SELECT * FROM fabrication_services";
    const data = await DBQuery2(sqlQuery);
    res.json(data);
});

//material
router.get("/material", async (req, res) => {
    const sqlQuery = "SELECT * FROM materials";
    const data = await DBQuery2(sqlQuery);
    res.json(data);
});

module.exports = router;
