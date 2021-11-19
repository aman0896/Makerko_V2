module.exports = function (app, db) {
    //#region api call for setting star rating in db
    app.post('/set-star-rating', (req, res) => {
        const userID = req.body.userID;
        const rating = req.body.rating;
        const makerID = req.body.makerID;
        SelectRating(db, userID, makerID, (err, response) => {
            if (err) {
                return console.log('starratingerr', err);
            }
            if (response.length > 0) {
                UpdateRatings(db, userID, rating, makerID, (err, response) => {
                    if (err) {
                        return console.log('starratingerr', err);
                    }
                });
            } else {
                InsertRatings(db, userID, rating, makerID, (err, response) => {
                    if (err) {
                        return console.log('starratingerr', err);
                    }
                    console.log('Thanks for rating');
                });
            }
        });
    });
    //#endregion

    app.post('/get-star-rating', (req, res) => {
        const userID = req.body.userID;
        const makerID = req.body.makerID;

        GetTotalRating(db, makerID, (err, result) => {
            if (err) {
                return console.log('getstarratomgerr', err);
            }
            if (result.length > 0) {
                var totalReviews = result.length;
                array = [];
                result.forEach((element) => {
                    array.push(element.Star_Ratings);
                });
                var averageRating =
                    array.reduce((a, v) => (a = a + v), 0) / totalReviews;

                GetRating(userID, (rating) => {
                    console.log(userID, '==========');
                    console.log(rating);
                    res.send({
                        totalReviews: totalReviews,
                        averageRating: averageRating,
                        myRating: rating,
                    });
                });
            }
        });

        function GetRating(userID, rating) {
            if (userID) {
                SelectRating(db, userID, makerID, (err, result) => {
                    if (err) {
                        return console.log('starratingerr', err);
                    }
                    if (result.length > 0) {
                        var starRating = result[0].Star_Ratings;
                        rating(starRating);
                    }
                });
            } else {
                rating(0);
            }
        }
    });
};

//#region Insert Rating in db
function InsertRatings(db, userID, rating, makerID, getResult) {
    const sql =
        'INSERT INTO ratings (User_ID, Star_Ratings, Manufacturer_ID) VALUES(?,?,?)';

    db.query(sql, [userID, rating, makerID], (err, result) => {
        if (err) {
            getResult(err, null);
            return console.log('ratingerr', err);
        }
        getResult(null, result);
    });
}
//#endregion

//#region Update rating by manufacturerID and customer ID
function UpdateRatings(db, userID, rating, makerID, getResult) {
    const sql =
        'UPDATE ratings SET Star_Ratings = ? WHERE User_ID = ? AND Manufacturer_ID = ?';

    db.query(sql, [rating, userID, makerID], (err, result) => {
        if (err) {
            getResult(err, null);
            return console.log('ratingerr', err);
        }
        getResult(null, result);
    });
}
//#endregion

//#region Select rating by manufacturerID and customerID
function SelectRating(db, userID, makerID, getResult) {
    const sql =
        'SELECT * FROM ratings WHERE User_ID = ? AND Manufacturer_ID = ?';

    db.query(sql, [userID, makerID], (err, result) => {
        if (err) {
            getResult(err, null);
            return console.log('ratingerr', err);
        }
        getResult(null, result);
    });
}
//#endregion

//#region Select rating by manufacturerID and customerID
function GetTotalRating(db, makerID, getResult) {
    const sql = 'SELECT * FROM ratings WHERE Manufacturer_ID = ?';

    db.query(sql, [makerID], (err, result) => {
        if (err) {
            getResult(err, null);
            return console.log('ratingerr', err);
        }
        console.log(result, 'star-rating');
        getResult(null, result);
    });
}
//#endregion
