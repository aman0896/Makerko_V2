const express = require("express");
const router = express.Router();
const db = require("../DBController/DBConnect");
const { ResetPassword } = require("../Utils/Nodemailer");

router.post("/forgot-password", (req, res) => {
    try {
        console.log(req.body.email, "check");
        const query = "SELECT Email FROM customer WHERE Email=?";
        data = [req.body.email];
        db.query(query, data, async (err, result) => {
            try {
                if (err) return console.log(err, "err");
                if (result.length === 0) {
                    res.json({ email: false });
                } else {
                    const resetLink = `http://localhost:3000/account/resetPassword?email=${req.body.email}`;
                    const sent = await ResetPassword(req.body.email, resetLink);
                    console.log(sent, "message sent");
                    // res.json({ link: changePasswordLink, email: true });
                }
            } catch {}
        });
    } catch {}
});

router.post("/reset-password", (req, res) => {});

module.exports = router;
