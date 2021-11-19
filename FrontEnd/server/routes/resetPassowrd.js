const express = require('express');
const db = require('../DBController/DBConnect');
const { ResetPasswordMail } = require('../nodemailer');

const router = express.Router();

router.post('/reset-password', (req, res) => {
    const email = req.body.email;
    const url = req.body.url;
    console.log('fff', email, url);
    db.query(
        'SELECT * FROM customer WHERE Email = ?',
        [email],
        async (err, result) => {
            if (result.length === 0) {
                db.query(
                    'SELECT * FROM manufacturer WHERE Email =?',
                    [email],
                    async (err, result) => {
                        if (!(result && result.length > 0)) {
                            console.log("doesn't exiss");
                            res.send({ message: "Email doesn't exist" });
                        } else {
                            console.log(result);
                            const sent = await ResetPasswordMail(email, url);
                            if (sent) {
                                res.send(
                                    'Link  has been sent to email to reset password'
                                );
                            }
                        }
                    }
                );
            } else {
                const sent = await ResetPasswordMail(email, url);
                console.log(sent, 'sent');
                //res.send(id.toString());
                if (sent) {
                    res.send('Link  has been sent to email to reset password');
                }
            }
        }
    );
});

module.exports = router;
