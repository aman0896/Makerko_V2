const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const securityKey = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);

function Cipher(amount) {
    const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
    let amountCode = cipher.update(amount, "utf-8", "hex");
    amountCode += cipher.final("hex");
    return amountCode;
}

function Decipher(amountCode) {
    // the decipher function
    const decipher = crypto.createDecipheriv(
        algorithm,
        securityKey,
        initVector
    );
    let amount = decipher.update(amountCode, "hex", "utf-8");
    amount += decipher.final("utf8");
    return amount;
}

module.exports = { Decipher, Cipher };
