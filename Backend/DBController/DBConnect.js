const express = require("express");
const mysql = require("mysql");

//#region databaseConnection
// const db = mysql.createConnection({
//     user: "makerko",
//     host: "localhost",
//     password: "c7O3TghEk8qWa2h0",
//     database: "makerko",
// });

const db = mysql.createConnection({
    user: "ajay",
    host: "localhost",
    password: "@Buntu421",
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
