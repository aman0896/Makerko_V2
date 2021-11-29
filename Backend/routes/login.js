const express = require("express");
const DBQuery = require("../DBController/DatabaseQuery");

//db initialization
const db = require("../DBController/DBConnect");
const { PasswordCheck } = require("../Utils/passwordSecurity");

const router = express.Router();

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    var date = new Date();
    date.setHours(date.getHours() + 1);
    UserCheck(email, password, (err, response) => {
        if (err) {
            console.log(err);
            if (err.verified != undefined && err.verified == false) {
                console.log(err.verified, "verified");
                res.send({ userVerified: false });
            } else if (
                err.userLoggedIn != undefined &&
                err.userLoggedIn == false
            ) {
                res.send({ userLoggedIn: false });
                console.log(err.userLoggedIn, "login");
            }
        } else {
            console.log(response);
            var accessToken = response.accessToken;
            res.status(202)
                .cookie("uid", accessToken, {
                    sameSite: "strict",
                    path: "/",
                    expires: date,
                    httpOnly: true,
                })
                .send({
                    userLoggedIn: true,
                    userVerified: true,
                });
        }
    });
});

module.exports = router;

//#region user login authentication
async function UserCheck(inputEmail, inputPassword, sendResponse) {
    var user = await EmailExistCheck(inputEmail);
    console.log(user, "emailExist");
    if (user.emailExist && user.userType == "customer") {
        const isPasswordMatch = await PasswordCheck(
            inputPassword,
            user.password
        );
        if (isPasswordMatch) {
            if (user.emailVerfication == 1) {
                let userInfo = {
                    uid: user.uid,
                    loggedIn: true,
                    userStatus: user.userType,
                };
                const accessToken = jwt.sign(
                    { data: userInfo },
                    JWT_AUTH_TOKEN
                );
                sendResponse(null, { accessToken: accessToken });
            } else {
                sendResponse({ verified: false }, null);
            }
        } else {
            sendResponse({ userLoggedIn: false }, null);
        }
    } else if (user.emailExist && user.userType == "maker") {
        const isPasswordMatch = await PasswordCheck(
            inputPassword,
            user.password
        );
        if (isPasswordMatch) {
            if (user.emailVerfication == "Verified") {
                let userInfo = {
                    uid: user.uid,
                    loggedIn: true,
                    userStatus: user.userType,
                };
                const accessToken = jwt.sign(
                    { data: userInfo },
                    JWT_AUTH_TOKEN
                );
                sendResponse(null, { accessToken: accessToken });
            } else {
                sendResponse({ verified: false }, null);
            }
        } else {
            sendResponse({ userLoggedIn: false }, null);
        }
    } else {
        sendResponse({ userLoggedIn: false }, null);
        console.log("email or password did not match");
    }
}
//#endregion

//#region check if customer email exist in db
async function EmailExistCheck(inputEmail) {
    let userData = null;
    const customerSQLQuery =
        "SELECT Customer_ID, Email, Password, Verified FROM customer WHERE Email = ?";
    const makerSQLQuery =
        "SELECT Manufacturer_ID, Email, Password, Email_Verification FROM manufacturer WHERE Email = ?";

    DBQuery(customerSQLQuery, [inputEmail], function (result) {
        if (result.length > 0) {
            console.log(result);
            userData = {
                emailExist: true,
                uid: result[0].Customer_ID,
                userType: "customer",
                password: result[0].Password,
                emailVerfication: result[0].Verified,
            };
        } else {
            DBQuery(makerSQLQuery, [inputEmail], function (result) {
                if (result.length > 0) {
                    console.log();
                    userData = {
                        emailExist: true,
                        uid: result[0].Manufacturer_ID,
                        userType: "maker",
                        password: result[0].Password,
                        emailVerfication: result[0].Email_Verification,
                    };
                }
            });
        }
    });

    return userData;
}
//#endregion
