const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function PasswordEncryption() {}
exports.PasswordEncryption = PasswordEncryption;

//#region user input password and stored password check
function PasswordCheck(inputPassword, storedPassword, sendResponse) {
    bcrypt.compare(inputPassword, storedPassword, (error, response) => {
        console.log(inputPassword, storedPassword);
        if (error) {
            sendResponse(error, null);
        } else {
            sendResponse(null, response);
        }
    });
}
exports.PasswordCheck = PasswordCheck;
//#endregion

//#region get cookie - userinfo
function GetCookieDetail(accessToken, JWT_AUTH_TOKEN) {
    let cookieInfo = undefined;
    jwt.verify(accessToken, JWT_AUTH_TOKEN, (err, userInfo) => {
        if (userInfo) {
            cookieInfo = userInfo.data;
        }
    });
    return cookieInfo;
}
exports.GetCookieDetail = GetCookieDetail;
//#endregion

//#region get cookie - userinfo
function GenerateUid(accessToken, JWT_AUTH_TOKEN) {
    let randomId = crypto.randomBytes(16).toString("hex");
    return randomId;
}
exports.GenerateUid = GenerateUid;
//#endregion
