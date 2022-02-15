const db = require("../DBController/DBConnect");

//DBQuery with Data
function DBQuery(sqlQuery, data, callback) {
    db.query(sqlQuery, data, (err, result) => {
        try {
            if (err) {
                return callback(err, null);
            } else {
                return callback(null, result);
            }
        } catch {}
    });
}

//DBQuery without data
function DBQuery2(sqlQuery) {
    return new Promise((resolve) => {
        try {
            db.query(sqlQuery, (err, result) => {
                try {
                    if (err) {
                        console.log(err, "dbqueryerror");
                        throw err;
                    } else {
                        resolve(result);
                    }
                } catch {}
            });
        } catch {}
    });
}

module.exports = { DBQuery, DBQuery2 };
