const bcrypt = require('bcrypt');
const saltRound = 10;

async function PasswordEncryption(password, response) {
    bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) return response(err, null);
        response(null, hash);
    });
}

async function PasswordCheck(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
}
module.exports = { PasswordEncryption, PasswordCheck };
