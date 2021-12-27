const express = require("express");
const { DBQuery } = require("../DBController/DatabaseQuery");
const router = express.Router();

router.get("/maker-order", (req, res) => {
    console.log(req.query[0], "query");
    const id = req.query[0];

    const sqlQuery =
        "SELECT * FROM order_specification WHERE Manufacturer_ID = ?";
    const data = [id];
    DBQuery(sqlQuery, data, (err, result) => {
        if (err) {
            return console.log(err, "line no 14, order.js");
        } else {
            console.log(result, "result");
            res.json({ result });
        }
    });
});

module.exports = router;
