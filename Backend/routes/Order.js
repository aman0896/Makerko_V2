const express = require("express");
const { DBQuery } = require("../DBController/DatabaseQuery");
const router = express.Router();

router.get("/maker-order", (req, res) => {
    try {
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
    } catch {}
});

//#region Update OrderStatusPage
router.post("/update-status", (req, res) => {
    try {
        console.log(req.body, "orderstausupdate");
        const updatedStatus = req.body.updatedStatus;
        const orderId = req.body.orderId;
        const sqlQuery =
            "UPDATE order_specification SET Status = ? WHERE Order_ID = ?";
        data = [updatedStatus, orderId];
        DBQuery(sqlQuery, data, (err, result) => {
            if (err) return console.log(err, "update status error");
            console.log(result, "result");
            res.json({ update: "success" });
        });
    } catch (err) {
        console.log(err, "catcherror update-order-status");
    }
});
//#endregion

router.get("/customer-order", (req, res) => {
    try {
        const id = req.query[0];

        const sqlQuery =
            "SELECT * FROM order_specification WHERE Customer_ID = ?";
        const data = [id];
        DBQuery(sqlQuery, data, (err, result) => {
            if (err) {
                return console.log(err, "line no 14, order.js");
            } else {
                console.log(result, "result");
                res.json({ result });
            }
        });
    } catch {}
});

module.exports = router;
