const crypto = require("crypto");
const { NodeMailer, SendOTP } = require("./Nodemailer");

// #region Generate 6 digit Random OTP
const GenerateOTP = () => {
    var otp = Math.random();
    otp = Math.floor(100000 + otp * 900000);
    console.log(otp);
    return otp;
};
//#endregion

console.log(process.env.OTP_Key, "env");

//Create and send OTP to email
async function CreateHash(email) {
    const otp = GenerateOTP();
    const totalTime = 5 * 60 * 1000; //5 minutes in miliseconds
    const expires = Date.now() + totalTime; //timestamp to 5 minutes in the future
    const data = `${email}.${otp}.${expires}`; // email.otp.exipry_timestamp
    const hash = crypto
        .createHmac("sha256", process.env.OTP_Key)
        .update(data)
        .digest("hex"); //creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user
    console.log(fullHash, "hash");
    // //#region Send_Mail
    const isSent = await SendOTP(email, otp);
    //#endregion

    if (isSent) {
        return fullHash;
    }
}

function OTPVerification(email, hash, inputOTP) {
    //Seperate Hash value and expires from the hash returned from the user
    let [hashValue, expires] = hash.split(".");

    //Check if expiry time has passed
    // let now = Date.now();
    // if (now > parseInt(expires)) return false;

    //Calculate new hash with the same key and the same algorithm
    let data = `${email}.${inputOTP}.${expires}`;
    let newCalculatedHash = crypto
        .createHmac("sha256", process.env.OTP_Key)
        .update(data)
        .digest("hex");
    //Match the hashes
    if (newCalculatedHash === hashValue) {
        return true;
    }
    return false;
}

module.exports = { CreateHash, OTPVerification };
