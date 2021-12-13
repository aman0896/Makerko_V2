const express = require("express");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
var fs = require("fs");
const { SingleFileUpload } = require("../Utils/MultarFileUpload");
const FileDownload = require("../Utils/FileDownload");
const { FileMove } = require("../Utils/Operations");
const { DBQuery } = require("../DBController/DatabaseQuery");
const router = express.Router();

router.post("/customer-edit", (req, res) => {
    const upload = SingleFileUpload("profileImage", null);
    upload(req, res, async (err) => {
        const imageFile = req.file;
        const userDetails = JSON.parse(req.body.currentUser);
        const userUpdateDetails = JSON.parse(req.body.userUpdates);
        console.log(imageFile, userDetails, userUpdateDetails, "details");
        const dir = `./public/uploads/customer/${userDetails.Customer_ID}/${imageFile.fieldname}/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (err) {
            console.log(err, "error");
        } else {
            let tmp_path = imageFile.path;
            let target_path = dir + imageFile.filename;
            const filePath = await FileMove(tmp_path, target_path);
            const sqlQuery =
                "UPDATE customer SET First_Name =?, Last_Name=?, Email=?, Phone_Number=?, Address=?, Profile_Image = ? WHERE Customer_ID = ?";
            const data = [
                userUpdateDetails.firstName,
                userUpdateDetails.lastName,
                userUpdateDetails.email,
                userUpdateDetails.phoneNumber,
                userUpdateDetails.address,
                JSON.stringify({
                    filename: imageFile.filename,
                    filePath: filePath,
                }),
                userDetails.Customer_ID,
            ];
            DBQuery(sqlQuery, data, (err, result) => {
                if (err) {
                    return console.log(err, "update customer profile error");
                } else {
                    res.json(result);
                    return;
                }
            });
        }
    });
});

router.post("/maker-edit", (req, res) => {
    const upload = SingleFileUpload("profileImage", null);
    upload(req, res, async (err) => {
        const imageFile = req.file;
        const userDetails = JSON.parse(req.body.currentUser);
        const userUpdateDetails = JSON.parse(req.body.userUpdates);
        console.log(imageFile, userDetails, userUpdateDetails, "details");
        const dir = `./public/uploads/maker/${userDetails.Manufacturer_ID}/${imageFile.fieldname}/`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (err) {
            console.log(err, "error");
        } else {
            let tmp_path = imageFile.path;
            let target_path = dir + imageFile.filename;
            const filePath = await FileMove(tmp_path, target_path);
            const sqlQuery =
                "UPDATE manufacturer SET Company_Name=?, Logo=?, Contact_Person=?,Email=?,Phone_Number=?, Address = ?, Brief_Description = ?, Additional_Details = ? WHERE Manufacturer_ID = ?";
            const data = [
                userUpdateDetails.companyName,
                JSON.stringify({
                    filename: imageFile.filename,
                    filePath: filePath,
                }),
                userUpdateDetails.contactPerson,
                userUpdateDetails.email,
                userUpdateDetails.phoneNumber,
                userUpdateDetails.address,
                userUpdateDetails.briefDescription,
                userUpdateDetails.additionalDetails,

                userDetails.Manufacturer_ID,
            ];
            DBQuery(sqlQuery, data, (err, result) => {
                if (err) {
                    return console.log(err, "update maker profile error");
                } else {
                    res.json(result);
                    return;
                }
            });
        }
    });
});

module.exports = router;
