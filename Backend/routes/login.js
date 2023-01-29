const express = require("express");
const { DBQuery } = require("../DBController/DatabaseQuery");

//db initialization
const db = require("../DBController/DBConnect");
const { SignJWt } = require("../Utils/jwt");
const { CreateHash } = require("../Utils/OTP");
const { PasswordCheck } = require("../Utils/passwordSecurity");

const router = express.Router();

router.post("/login", (req, res) => {
    try {
        console.log(req.body, "body");
        const email = req.body.email;
        const password = req.body.password;
        var date = new Date();
        date.setFullYear(date.getFullYear() + 1);
        UserCheck(email, password, (err, response) => {
            try {
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
                        
                    } else if (!err.emailExist) {
                        res.send({ emailExist: false });
                    }
                } else {
                    console.log(response, "responsetoken");
                    var accessToken = response.accessToken;
                    console.log(accessToken);
                    res.status(202)
                        .cookie("u_id", accessToken, {
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
            } catch {}
        });
    } catch {}
});

router.post("/send-otp", async (req, res) => {
    try {
        console.log("check", "check");
        const email = req.body.email;
        console.log(email, "email");
        const hash = await CreateHash(email);
        console.log(hash, "hash");
        if (hash) {
            res.json({ hash: hash, message: "OTP has been sent to you email" });
        }
    } catch {}
});

module.exports = router;

//#region user login authentication
async function UserCheck(inputEmail, inputPassword, sendResponse) {
    try {
        
        var user = await EmailExistCheck(inputEmail);
        console.log(user, "emailExist");
        if (user.emailExist && user.userType == "customer") {
            const isPasswordMatch = await PasswordCheck(
                inputPassword,
                user.password
            );
            console.log(isPasswordMatch, "passwordcheck");
            if (isPasswordMatch) {
                if (user.emailVerfication == 1) {
                    let userInfo = {
                        uid: user.uid,
                        
                        loggedIn: true,
                        userType: user.userType,

                    };
                    const accessToken = SignJWt(userInfo);
                    
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
                        userType: user.userType,
                    };
                    const accessToken = SignJWt(userInfo);
                    sendResponse(null, { accessToken: accessToken });
                    
                } else {
                    sendResponse({ verified: false }, null);
                }
            } else {
                sendResponse({ userLoggedIn: false }, null);
                

            }
        } else {
  
            sendResponse({ emailExist: false }, null);
            
        }
    } catch {}
}
//#endregion

//#region check if customer email exist in db
async function EmailExistCheck(inputEmail) {
    try {
        const customerSQLQuery =
            "SELECT Customer_ID, Email, Password, Verified FROM customer WHERE Email = ?";
        const makerSQLQuery =
            "SELECT Manufacturer_ID, Email, Password, Email_Verification FROM manufacturer WHERE Email = ?";

        return new Promise((resolve, reject) => {
            DBQuery(customerSQLQuery, [inputEmail], function (err, result) {
                try {
                    console.log(result, "result");
                    if (err) {
                        return console.log(err, "login error");
                    }
                    if (result.length > 0) {
                        let userData = {
                            emailExist: true,
                            uid: result[0].Customer_ID,
                            userType: "customer",
                            password: result[0].Password,
                            emailVerfication: result[0].Verified,
                        };
                        resolve(userData);
                    } else {
                        DBQuery(
                            makerSQLQuery,
                            [inputEmail],
                            function (err, result) {
                                if (err)
                                    return console.log(
                                        err,
                                        "maker login error"
                                    );
                                if (result.length > 0) {
                                    console.log(result, "makerresult");
                                    let userData = {
                                        emailExist: true,
                                        uid: result[0].Manufacturer_ID,
                                        userType: "maker",
                                        password: result[0].Password,
                                        emailVerfication:
                                            result[0].Email_Verification,
                                    };
                                    resolve(userData);
                                } else {
                                    resolve({
                                        emailExist: false,
                                    });
                                }
                            }
                        );
                    }
                } catch {}
            });
        });
    } catch {}
}
//#endregion
