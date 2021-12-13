const db = require("../DBController/DBConnect");

//DBQuery with Data
function DBQuery(sqlQuery, data, callback) {
    db.query(sqlQuery, data, (err, result) => {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, result);
        }
    });
}

//DBQuery without data
function DBQuery2(sqlQuery) {
    return new Promise((resolve) => {
        db.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err, "dbqueryerror");
                throw err;
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { DBQuery, DBQuery2 };
