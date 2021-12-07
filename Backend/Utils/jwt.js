const jwt = require("jsonwebtoken");

const Auth_Token = process.env.JWT_AUTH_TOKEN;

function SignJWt(data) {
    const token = jwt.sign(data, Auth_Token);
    return token;
}

function VerifyToken(req, res, next) {
    // const authToken = req.headers["authorization"];
    // console.log(authToken, "authtoken", req.headers);
    const accessToken = req.cookies.u_id;
    if (accessToken) {
        jwt.verify(accessToken, Auth_Token, (err, result) => {
            if (err) return res.json({ loggedIn: false });
            req.user = result;
            next();
        });
    } else {
        return res.json({ loggedIn: false });
    }
}
module.exports = { SignJWt, VerifyToken };
