const jwt = require("jsonwebtoken");

const auth_token =
    "89742d737df048f8ee36b0cb8b9f51fdabbd83fda7a1bcc363af4a3f4a3723324abcc873a7d4df7e6b3a9270f2011555071c9d2781bbe7ffe1bc60b5cbca1e5c";

function SignJWt(data) {
    const token = jwt.sign(data, auth_token);
    return token;
}

function VerifyToken(req, res, next) {
    const authToken = req.headers["authorization"];
    console.log(authToken, "authtoken", req.headers);
    if (authToken) {
        jwt.verify(authToken, auth_token, (err, result) => {
            if (err) return res.json({ success: false, msg: "not found" });
            req.user = result;
            next();
        });
    }
}
module.exports = { SignJWt, VerifyToken };
