const { SendRequestDesignMail } = require('../nodemailer');

module.exports = function (app, db, hostAddress) {
    app.post('/request-design', (req, res) => {
        const productDetail = req.body.productDetail;
        const userID = req.body.uid;
        const userEmail = req.body.userEmail;
        const username = req.body.username;
        console.log(req.body.productDetail, 'detail');
        const imageUri =
            process.env.File_Server + productDetail.productImage.filePath;
        const sketchUri =
            process.env.File_Server + productDetail.productSketch.filePath;
        const designDescription = productDetail.productDescription;
        console.log(designDescription);
        InsertDesignRequest(
            db,
            userID,
            productDetail,
            async (err, response) => {
                if (err) return err;
                const mailSent = await SendRequestDesignMail(
                    userEmail,
                    username,
                    imageUri,
                    sketchUri,
                    designDescription
                );
                res.json({ mailSent: mailSent });
            }
        );
    });
    app.post(`/:id/requestorder-status`, (req, res) => {
        try {
            const id = req.params.id;
            //const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);
            //console.log(currentUser.uid, id);

            db.query(
                'SELECT * FROM design_request WHERE Customer_ID =?',
                [id],
                (err, orderList) => {
                    console.log(err);
                    console.log(orderList, 'orderlist---');
                    if (!err && orderList.length > 0) {
                        console.log(orderList, 'orderlist---');
                        res.send(orderList);
                    } else {
                        db.query(
                            'SELECT * FROM design_request WHERE Customer_ID =?',
                            [id],
                            (err, orderList) => {
                                console.log(err);
                                if (!err && orderList.length >= 0) {
                                    res.send(orderList);
                                }
                            }
                        );
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    });
    //#endregion
};

function InsertDesignRequest(db, userID, productDetail, getResult) {
    const productImage = JSON.stringify(productDetail.productImage);
    const productSketch = JSON.stringify(productDetail.productSketch);
    const productDescription = productDetail.productDescription;
    const sql =
        'INSERT INTO design_request(Product_Image, Product_Sketch, Product_Description, Customer_ID) VALUES (?, ?, ?, ?)';
    db.query(
        sql,
        [productImage, productSketch, productDescription, userID],
        (err, result) => {
            if (err) {
                console.log(err, 'insert request-desing err');
                getResult(err, null);
                return;
            }

            getResult(null, result);
        }
    );
}
