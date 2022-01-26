const express = require("express");
const { DBQuery2 } = require("../DBController/DatabaseQuery");
const router = express.Router();

//fabrication method
router.get("/fabricationMethod", async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM fabrication_services";
        const data = await DBQuery2(sqlQuery);
        res.json(data);
    } catch {}
});

//material
router.get("/material", async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM materials";
        const data = await DBQuery2(sqlQuery);
        res.json(data);
    } catch {}
});

//material
router.get("/makers-services", async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM services";
        const data = await DBQuery2(sqlQuery);
        res.json(data);
    } catch {}
});

module.exports = router;
