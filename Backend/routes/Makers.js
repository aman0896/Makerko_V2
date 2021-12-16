const express = require("express");
const { DBQuery2 } = require("../DBController/DatabaseQuery");

const router = express.Router();

router.get("/map", async (req, res) => {
    try {
        const getMakersSql =
            "SELECT * FROM location l INNER JOIN manufacturer m WHERE m.Manufacturer_ID=l.Manufacturer_ID";
        const result = await DBQuery2(getMakersSql);
        res.json(result);
        return;
    } catch (err) {
        return false;
    }
});

module.exports = router;
