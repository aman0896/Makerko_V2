const express = require("express");
const { DBQuery } = require("../DBController/DatabaseQuery");
const { GetUserData, UpdateUserData } = require("../DBController/DBController");
const { OTPVerification } = require("../Utils/OTP");

const router = express.Router();

router.post("/verify", async (req, res) => {
    const { inputOTP, email, hash } = req.body;
    const isVerified = OTPVerification(email, hash, inputOTP);
    if (isVerified) {
        const CusotmerSqlQuery = "SELECT Email from customer WHERE Email = ?";
        const makerSqlQuery = "SELECT Email from manufacturer WHERE Email = ?";
        const customerData = await GetUserData(CusotmerSqlQuery, email);
        const makerData = await GetUserData(makerSqlQuery, email);
        console.log(customerData, makerData, "userData");
        if (customerData.length > 0) {
            const sqlQuery = "UPDATE customer SET Verified =? WHERE email = ?";
            const data = [1, email];
            const result = await UpdateUserData(sqlQuery, data);
            if (result) {
                res.status(200).json({
                    isVerified: true,
                });
            }
        }
        if (makerData.length > 0) {
            const sqlQuery =
                "UPDATE manufacturer SET Email_Verification =? WHERE email = ?";
            const data = ["Verified", email];
            const result = await UpdateUserData(sqlQuery, data);
            if (result) {
                res.status(200).json({
                    isVerified: true,
                });
            }
        }
    } else {
        res.send({ isVerified: false });
    }
});

module.exports = router;
