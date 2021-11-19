const crypto = require('crypto');
const { NodeMailer } = require('./nodemailer');

// #region Generate 6 digit Random OTP
const GenerateOTP = () => {
    var otp = Math.random();
    otp = Math.floor(100000 + otp * 900000);
    console.log(otp);
    return otp;
};
exports.GenerateOTP = GenerateOTP;
//#endregion

//Create and send OTP to email
function CreateNewOTP(email) {
    const otp = GenerateOTP();
    const totalTime = 5 * 60 * 1000; //5 minutes in miliseconds
    const expires = Date.now() + totalTime; //timestamp to 5 minutes in the future
    const data = `${email}.${otp}.${expires}`; // email.otp.exipry_timestamp
    const hash = crypto
        .createHmac('sha256', process.env.OTP_Key)
        .update(data)
        .digest('hex'); //creating SHA256 hash of the data
    const fullHash = `${hash}.${expires}`; // Hash.expires, format to send to the user

    //#region Send_Mail
    var mailOptions = {
        from: '"Makerko" <enquiry@makerko.com>',
        to: email,
        subject: 'Otp for registration is: ',
        html:
            '<h3>OTP for account verification is </h3>' +
            "<h1 style ='font-weight:bold;'>" +
            otp +
            '</h1>',
    };
    const transporter = NodeMailer();
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message Sent: %s', info);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
    //#endregion

    return fullHash;
}
exports.CreateNewOTP = CreateNewOTP;

function verifyOTP(email, hash, otp) {
    //Seperate Hash value and expires from the hash returned from the user
    let [hashValue, expires] = hash.split('.');

    //Check if expiry time has passed
    // let now = Date.now();
    // if (now > parseInt(expires)) return false;

    //Calculate new hash with the same key and the same algorithm
    let data = `${email}.${otp}.${expires}`;
    let newCalculatedHash = crypto
        .createHmac('sha256', process.env.OTP_Key)
        .update(data)
        .digest('hex');
    //Match the hashes
    if (newCalculatedHash === hashValue) {
        return true;
    }
    return false;
}
exports.verifyOTP = verifyOTP;
