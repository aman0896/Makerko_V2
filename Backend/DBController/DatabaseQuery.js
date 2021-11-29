const db = require("../DBController/DBConnect");

function DBQuery(sqlQuery, data, callback) {
    db.query(sqlQuery, data, (err, result) => {
        if (err) {
            console.log(err, "dbqueryerror");
            throw err;
        } else {
            callback(result);
        }
    });
}

module.exports = DBQuery;
