const express = require("express");
const mysql = require("mysql");

//#region databaseConnection
// const db = mysql.createConnection({
//     user: "makerko",
//     host: "localhost",
//     password: "9841290215",
//     database: "database",
// });

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "537573616E",
    database: "makerko",

    // password: "fabhubs",
    // database: "fabhubsdb",
});

db.connect((err) => {
    try {
        if (!err) console.log("DB connection Succedded");
        else console.log("failed \n Error:" + JSON.stringify(err.message));
    } catch {}
});

module.exports = db;
//#endregion
