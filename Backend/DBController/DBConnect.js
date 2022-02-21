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
  password: "root123",
  database: "makerko",
});

db.connect((err) => {
  if (!err) console.log("DB connection Succedded from invalid");
  else console.log("failed \n Error:" + JSON.stringify(err.message));
});

module.exports = db;
//#endregion
