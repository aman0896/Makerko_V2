const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const securityKey = crypto.randomBytes(32);
const initVector = crypto.randomBytes(16);

function Cipher(amount) {
    try {
        const cipher = crypto.createCipheriv(
            algorithm,
            securityKey,
            initVector
        );
        let amountCode = cipher.update(amount, "utf-8", "hex");
        amountCode += cipher.final("hex");
        return amountCode;
    } catch {}
}

function Decipher(amountCode) {
    try {
        // the decipher function
        const decipher = crypto.createDecipheriv(
            algorithm,
            securityKey,
            initVector
        );
        let amount = decipher.update(amountCode, "hex", "utf-8");
        amount += decipher.final("utf8");
        return amount;
    } catch {}
}

module.exports = { Decipher, Cipher };
