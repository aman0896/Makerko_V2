const express = require("express");
const { FileMove } = require("../Utils/Operations");
const router = express.Router();
const fs = require("fs");
const { DBQuery } = require("../DBController/DatabaseQuery");

router.post("/get-quote", async (req, res) => {
    console.log(req.body, "quotebody");
    const user = req.body.currentUserData;
    const maker = req.body.maker;
    const orderType = `${req.body.orderType}`;
    const file = req.body.file;
    const process = req.body.process;
    let dir, filePath;
    if (Object.keys(user).includes("Customer_ID")) {
        dir = `./public/uploads/customer/${user.Customer_ID}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        target_path = `${dir}/${file.filename}`;
        filePath = await FileMove(file.path, target_path);
    } else {
        dir = `./public/uploads/maker/${user.Manufacturer_ID}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        target_path = `${dir}/${file.filename}`;
        filePath = await FileMove(file.path, target_path);
    }
    const sqlQuery =
        "INSERT INTO order_specification (Order_Type, Model_Name, Fabrication_Service, Material, Thickness, Quantity, Model_Path, Customer_ID, Manufacturer_ID, Status, Amount, Date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
    const data = [
        orderType,
        file.filename,
        process.method.Name,
        process.material.Material_Name,
        process.thickness,
        process.quantity,
        filePath,
        user.Customer_ID,
        maker.Manufacturer_ID,
        "pending",
        0,
        Date.now(),
    ];

    DBQuery(sqlQuery, data, (err, result) => {
        if (err) {
            console.log(err, "quote insert error");
            return;
        } else {
            console.log(result, "result");
            res.json({ message: "Request Success" });
        }
    });
});

module.exports = router;
