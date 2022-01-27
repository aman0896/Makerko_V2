const { DBQuery, DBQuery2 } = require("./DatabaseQuery");

async function GetAllUsersData() {
    sqlQuery =
        "SELECT Email FROM customer UNION ALL SELECT Email FROM manufacturer";
    const data = await DBQuery2(sqlQuery);
    return data;
}

//Get User Data by email or uid
async function GetUserData(sqlQuery, data) {
    // sqlQuery = "SELECT * FROM customer WHERE Email = ? ";
    return new Promise((resolve) => {
        DBQuery(sqlQuery, [data], function (err, result) {
            try {
                if (err) {
                    return console.log(err, "error getting userData");
                }
                resolve(result);
            } catch {}
        });
    });
}

//Update User Data
async function UpdateUserData(sqlQuery, data) {
    // sqlQuery = "SELECT * FROM customer WHERE Email = ? ";
    return new Promise((resolve) => {
        DBQuery(sqlQuery, data, function (err, result) {
            try {
                if (err) {
                    return console.log(err, "error updating userData");
                }
                resolve(result);
            } catch {}
        });
    });
}

module.exports = { GetAllUsersData, GetUserData, UpdateUserData };
