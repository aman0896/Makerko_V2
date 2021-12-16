const express = require("express");
const { GetUserData } = require("../DBController/DBController");
const FileDownload = require("../Utils/FileDownload");
const { VerifyToken } = require("../Utils/jwt");
const router = express.Router();
const { DBQuery2 } = require("../DBController/DatabaseQuery");

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
    const makerData = await GetUserData(makerSqlQuery, req.query.uid);
    if (customerData.length > 0) {
        res.json({ currentUserData: customerData });
    } else if (makerData.length > 0) {
        res.json({ currentUserData: makerData });
    }
});

router.get("/makers", async (req, res) => {
    console.log("params");
    const makerSqlQuery = "SELECT * FROM manufacturer";
    const makersList = await DBQuery2(makerSqlQuery);
    if (makersList.length > 0) {
        res.json({ makersList: makersList });
    }
});

//#region userLogout - clear cookie
router.get("/logout", (req, res) => {
    res.status(202).clearCookie("u_id").send("cookies delete");
});
//#endregion

module.exports = router;
