const express = require("express");
const { FileMove } = require("../Utils/Operations");
const router = express.Router();
const fs = require("fs");
const { DBQuery } = require("../DBController/DatabaseQuery");
const {
    SendOrderSpecificationMail,
    SendRequestDesignMail,
} = require("../Utils/nodemailer");

router.post("/get-quote", async (req, res) => {
    console.log(req.body, "quotebody");
    const user = req.body.currentUserData;
    const maker = req.body.maker;
    const orderType = `${req.body.orderType}`;
    const file = req.body.file.file[0];
    const process = req.body.process;
    let dir, filePath;
    if (Object.keys(user).includes("Customer_ID")) {
        dir = `./public/uploads/customer/${user.Customer_ID}/file`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        target_path = `${dir}/${file.filename}`;
        filePath = await FileMove(file.path, target_path);
    } else {
        dir = `./public/uploads/maker/${user.Manufacturer_ID}/file`;
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

    DBQuery(sqlQuery, data, async (err, result) => {
        if (err) {
            console.log(err, "quote insert error");
            return;
        } else {
            const mailSent = await SendOrderSpecificationMail(
                "validationPagePath",
                orderType,
                maker.Email,
                user.Email,
                user.First_Name,
                "orderStatusPagePath"
            );
            console.log(result, "result");
            res.json({ mailSent: mailSent });
        }
    });
});

router.post("/request-design", async (req, res) => {
    console.log(req.body, "quotebody");
    const userDetails = req.body.currentUserData;
    const productFile = req.body.values.productFile.productFile[0];
    const sketchFile = req.body.values.sketchFile.sketchFile[0];
    const description = req.body.values.description;
    let files = [productFile, sketchFile];
    let dir;
    let filePaths;
    if (Object.keys(userDetails).includes("Customer_ID")) {
        dir = `./public/uploads/customer/${userDetails.Customer_ID}/design`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const paths = await Promise.all(
            files.map(async (file) => {
                const target_path = `${dir}/${file.filename}`;
                const filePath = await FileMove(file.path, target_path);
                return filePath;
            })
        );
        filePaths = paths;
    } else {
        dir = `./public/uploads/maker/${userDetails.Manufacturer_ID}/design`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        const paths = await Promise.all(
            files.map(async (file) => {
                const target_path = `${dir}/${file.filename}`;
                const filePath = await FileMove(file.path, target_path);
                return filePath;
            })
        );
        filePaths = paths;
    }
    console.log(filePaths, "filepaths");
    const sqlQuery =
        "INSERT INTO design_request(Product_Image, Product_Sketch, Product_Description, Customer_ID) VALUES (?, ?, ?, ?)";
    const data = [
        filePaths[0],
        filePaths[1],
        description,
        userDetails.Customer_ID,
    ];
    DBQuery(sqlQuery, data, async (err, result) => {
        if (err) {
            console.log(err, "request design  error");
            return;
        } else {
            console.log(result, "result");
            const mailSent = await SendRequestDesignMail(
                userDetails.Email,
                userDetails.First_Name,
                process.env.File_Server +
                    "/public/uploads/customer/109/design/" +
                    productFile.filename,
                process.env.File_Server +
                    "/public/uploads/customer/109/design/" +
                    sketchFile.filename,
                description
            );
            res.json({ mailSent: mailSent });
        }
    });
});

module.exports = router;
