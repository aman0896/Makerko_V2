const express = require("express");
const { DBQuery } = require("../DBController/DatabaseQuery");
const { GetAllUsersData } = require("../DBController/DBController");
const { CreateHash } = require("../Utils/OTP");
const { PasswordEncryption } = require("../Utils/passwordSecurity");
const router = express.Router();

// router.get("/signup", async (req, res) => {
//     const data = await GetAllUsersData();
//     res.send(data);
//     console.log(data, "data");
// });

//#region Signup process
router.post("/signup", async (req, res) => {
    console.log(req.body, "info");
    const { firstName, lastName, email, address, password, phoneNumber } =
        req.body;
    const sqlQuery =
        "INSERT INTO customer (First_Name, Last_Name, Password, Email, Phone_Number, Address, Verified) VALUES (?,?,?,?,?,?,?)";

    const data = await GetAllUsersData();
    var index = data.findIndex((item) => item.Email === email);
    if (index == -1) {
        PasswordEncryption(password, (err, hash) => {
            if (err) {
                console.log(err, "password hasing error");
                return err;
            }
            const params = [
                firstName,
                lastName,
                hash,
                email,
                phoneNumber,
                address,
                0,
            ];

            DBQuery(sqlQuery, params, async function (err, result) {
                if (err) {
                    if (err.errno == 1062) {
                        console.log("userSignup", err);
                        return res.send({
                            emailExist: true,
                        });
                    }
                    return console.log(err);
                }
                const fullHash = await CreateHash(email);
                //Create OTP and send mail to email
                res.json({ hash: fullHash });
            });
        });
    } else return res.send({ emailExist: true });
});
//#endregion

module.exports = router;
