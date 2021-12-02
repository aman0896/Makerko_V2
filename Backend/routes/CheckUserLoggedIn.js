const express = require("express");
const { GetUserData } = require("../DBController/DBController");
const { VerifyToken } = require("../Utils/jwt");
const router = express.Router();

router.get("/isLoggedIn", VerifyToken, (req, res) => {
    const cookieData = req.user;
    console.log(cookieData, "cookiedata");
    res.status(200).json(cookieData);
});

router.get("/currentUser", async (req, res) => {
    console.log(req.query, "params");
    const customerSqlQuery = "SELECT * FROM customer WHERE Customer_ID = ?";
    const makerSqlQuery =
        "SELECT * FROM manufacturer WHERE Manufacturer_ID = ?";
    const customerData = await GetUserData(customerSqlQuery, req.query.uid);
    console.log(customerData, "data");
    const makerData = await GetUserData(makerSqlQuery, req.query.uid);
    if (customerData.length > 0) {
        res.json({ customerData });
    } else if (makerData.length > 0) {
        res.json({ makerData });
    }
});

module.exports = router;
