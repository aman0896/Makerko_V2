const bcrypt = require('bcrypt');
const { PasswordCheck } = require('../Utils');
const saltRound = 10;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const jwt = require('jsonwebtoken');

module.exports = function (app, db) {
    app.post('/login', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        var date = new Date();
        date.setHours(date.getHours() + 1);
        UserCheck(email, password, db, (err, response) => {
            if (err) {
                console.log(err);
                if (err.verified != undefined && err.verified == false) {
                    console.log(err.verified, 'verified');
                    res.send({ userVerified: false });
                } else if (
                    err.userLoggedIn != undefined &&
                    err.userLoggedIn == false
                ) {
                    res.send({ userLoggedIn: false });
                    console.log(err.userLoggedIn, 'login');
                }
            } else {
                console.log(response);
                var accessToken = response.accessToken;
                res.status(202)
                    .cookie('uid', accessToken, {
                        sameSite: 'strict',
                        path: '/',
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
};

//#region user login authentication
async function UserCheck(inputEmail, inputPassword, db, sendResponse) {
    var user = await EmailExistCheck(inputEmail, db);
    console.log(user, 'emailExist');
    if (user.emailExist && user.userType == 'customer') {
        PasswordCheck(inputPassword, user.password, (err, result) => {
            if (err) console.log(err, 'usercheck');
            else {
                if (result) {
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
            }
        });
    } else if (user.emailExist && user.userType == 'maker') {
        PasswordCheck(inputPassword, user.password, (err, result) => {
            if (err) console.log(err, 'usercheck');
            else {
                if (result) {
                    if (user.emailVerfication == 'Verified') {
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
            }
        });
    } else {
        sendResponse({ userLoggedIn: false }, null);
        console.log('email or password did not match');
    }
}
//#endregion

//#region Get all customer List from db
function DBCustomerList(db) {
    let sql = 'SELECT * FROM customer';
    var customerList = db.query(sql, (err, result) => {
        if (err) console.log(err, 'DBCustomerList');
        else {
            return result;
        }
    });
    return customerList;
}
//#endregion

//#region  get all maker list from db
function DBMakerList(db) {}
//#endregion

//#region check if customer email exist in db
function EmailExistCheck(inputEmail, db) {
    return new Promise((resolve) => {
        const customerSQLQuery =
            'SELECT Customer_ID, Email, Password, Verified FROM customer WHERE Email = ?';
        const makerSQLQuery =
            'SELECT Manufacturer_ID, Email, Password, Email_Verification FROM manufacturer WHERE Email = ?';
        db.query(customerSQLQuery, [inputEmail], (err, result) => {
            if (err) {
                console.log(err, 'emailexistcheck');
                return resolve(false);
            } else {
                if (result.length > 0) {
                    console.log(result);
                    return resolve({
                        emailExist: true,
                        uid: result[0].Customer_ID,
                        userType: 'customer',
                        password: result[0].Password,
                        emailVerfication: result[0].Verified,
                    });
                } else {
                    db.query(makerSQLQuery, [inputEmail], (err, result) => {
                        if (err) {
                            console.log(err, 'makersqlQuerty');
                            return resolve(false);
                        } else {
                            if (result.length > 0) {
                                console.log();
                                return resolve({
                                    emailExist: true,
                                    uid: result[0].Manufacturer_ID,
                                    userType: 'maker',
                                    password: result[0].Password,
                                    emailVerfication:
                                        result[0].Email_Verification,
                                });
                            } else {
                                return resolve(false);
                            }
                        }
                    });
                }
            }
        });
    });
}
//#endregion
