const nodemailer = require("nodemailer");
var fs = require("fs");

//#region initializing transporter to send mail
function NodeMailer() {
    let transporter = nodemailer.createTransport({
        host: "mail.makerko.com",
        port: 465,
        secure: true,
        auth: {
            user: "enquiry@makerko.com",
            pass: "Makerko@#56789",
        },
    });
    return transporter;
}
//#endregion

async function Tranporter(mailOptions) {
    let transporter = NodeMailer();
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error, "fsss");
                return reject(false);
            }
            console.log("Message Sent: %s", info.messageId);
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return resolve(true);
        });
    });
}

//#region order-specification
async function SendOrderSpecificationMail(
    validationPagePath,
    orderType,
    manufacturerEmail,
    userEmail,
    username,
    orderStatusPagePath
) {
    let result = [];
    if (orderType.includes("Check Design")) {
        var mailOptions = {
            from: `"${username}" <${userEmail}>`,
            to: "checkdesign@makerko.com",
            subject: "Design For Validation",
            html:
                "<h3>Click the link below to validate the design</h3>" +
                "<h1 style ='font-weight:bold;'>" +
                validationPagePath +
                "</h1>",
        };
        const success = await Tranporter(mailOptions);
        result.push({ checkDesign: success });
    }
    if (orderType.includes("Request Prototype")) {
        var mailOptions = {
            from: `"${username}" <${userEmail}>`,
            to: "prototype@makerko.com",
            subject: "Design For Validation",
            html:
                "<h3>A Design for prototype request has been sent to you</h3>" +
                "<h1 style ='font-weight:bold;'>" +
                validationPagePath +
                "</h1>",
        };
        const success = await Tranporter(mailOptions);
        result.push({ requestPrototpe: success });
    }
    if (orderType.includes("Request Quotation")) {
        console.log(manufacturerEmail, "mEmaiil");
        var mailOptions = {
            from: `"${username}" <${userEmail}>`,
            to: manufacturerEmail,
            subject: "Design For Validation",
            html:
                "<h3>A Design for quotation request has been sent to you</h3>" +
                "<h1 style ='font-weight:bold;'>" +
                orderStatusPagePath +
                "</h1>",
        };
        const success = await Tranporter(mailOptions);
        result.push({ requestQuotation: success });
    }
    return result;
}
//#endregion

//#region request-design
async function SendRequestDesignMail(userEmail, username, imageUri, sketchUri) {
    console.log(imageUri, sketchUri, "uruu");
    var mailOptions = {
        from: `"${username}" <${userEmail}>`,
        to: "enquiry@makerko.com",
        subject: "Request for Design",
        html:
            "<h3>" +
            userEmail +
            "</h3>" +
            "<span style ='font-size:15px;'>has requested for design</span>",
        attachments: [
            {
                filename: "image.jpg",
                path: imageUri,
            },
            {
                filename: "sketch.jpg",
                path: sketchUri,
            },
        ],
    };

    const sent = await Tranporter(mailOptions);
    return sent;
}
//#endregion

//#region request-design
async function ResetPasswordMail(userEmail, url) {
    var mailOptions = {
        from: '"Makerko" <enquiry@makerko.com>',
        to: userEmail,
        subject: "Reset Password ",
        html:
            "<h3>Click the link below to reset password. </h3>" +
            "<h4>" +
            url +
            "</h4>",
    };

    const sent = await Tranporter(mailOptions);
    return sent;
}
//#endregion

//#region request-design
async function SendOTP(userEmail, otp) {
    //#region Send_Mail
    var mailOptions = {
        from: '"Makerko" <enquiry@makerko.com>',
        to: userEmail,
        subject: "Otp for registration is: ",
        html:
            "<h3>OTP for your account verification is </h3>" +
            "<h2 style ='font-weight:bold;'>" +
            otp +
            "</h2>",
    };

    const sent = await Tranporter(mailOptions);
    return sent;
}
//#endregion

module.exports = {
    NodeMailer,
    SendOrderSpecificationMail,
    SendRequestDesignMail,
    ResetPasswordMail,
    SendOTP,
};
