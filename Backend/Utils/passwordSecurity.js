const bcrypt = require("bcrypt");
const saltRound = 10;

async function PasswordEncryption(password, response) {
    try {
        bcrypt.hash(password, saltRound, (err, hash) => {
            if (err) return response(err, null);
            response(null, hash);
        });
    } catch {}
}

async function PasswordCheck(password, hashPassword) {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch {}
}
module.exports = { PasswordEncryption, PasswordCheck };
