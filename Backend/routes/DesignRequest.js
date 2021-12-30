const express = require("express");
const { DBQuery } = require("../DBController/DatabaseQuery");
const router = express.Router();
router.get("/request_design_list", (req, res) => {
    const id = req.query[0];

    const sqlQuery = "SELECT * FROM design_request WHERE Customer_ID = ?";
    const data = [id];
    DBQuery(sqlQuery, data, (err, result) => {
        if (err) {
            return console.log(err, "line no 10, designrequest.js");
        } else {
            console.log(result, "result");
            res.json({ result });
        }
    });
});

module.exports = router;
