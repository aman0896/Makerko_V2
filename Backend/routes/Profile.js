const express = require("express");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
var fs = require("fs");
const {
    SingleFileUpload,
    MultipleFileUpload,
} = require("../Utils/MultarFileUpload");
const FileDownload = require("../Utils/FileDownload");
const { FileMove } = require("../Utils/Operations");
const { DBQuery } = require("../DBController/DatabaseQuery");
const { FileDelete } = require("../Utils/FileDelete");
const {
    PasswordEncryption,
    PasswordCheck,
} = require("../Utils/passwordSecurity");
const { GetUserData } = require("../DBController/DBController");
const router = express.Router();

router.post("/customer-edit", (req, res) => {
    try {
        const upload = SingleFileUpload("profileImage", null);
        upload(req, res, async (err) => {
            var imageFile = req.file;
            const prevImage =
                req.body.prevImage !== "undefined"
                    ? JSON.parse(req.body.prevImage)
                    : null;

            const userDetails = JSON.parse(req.body.currentUser);
            const userUpdateDetails = JSON.parse(req.body.userUpdates);
            console.log(imageFile, userDetails, userUpdateDetails, "details");
            // const dir = `./public/uploads/customer/${userDetails.Customer_ID}/${imageFile.fieldname}/`;
            // if (!fs.existsSync(dir)) {
            //     fs.mkdirSync(dir, { recursive: true });
            // }
            if (req.file) {
                console.log("inside if line 37");
                var dir = `./public/uploads/customer/${userDetails.Customer_ID}/${imageFile.fieldname}/`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                if (prevImage && prevImage.filePath) {
                    FileDelete(prevImage.filePath);
                }
            } else {
                console.log("line 46");
                console.log(prevImage, "line 47");
                imageFile = prevImage;
            }

            if (err) {
                console.log(err, "error");
            } else {
                let tmp_path = imageFile.path;
                let target_path = dir + imageFile.filename;
                const filePath = await FileMove(tmp_path, target_path);
                const sqlQuery =
                    "UPDATE customer SET First_Name =?, Last_Name=?, Email=?, Phone_Number=?, Address=?, Company_Type=?, Profile_Image = ?, Bio = ? WHERE Customer_ID = ?";
                const data = [
                    userUpdateDetails.firstName,
                    userUpdateDetails.lastName,
                    userUpdateDetails.email,
                    userUpdateDetails.phoneNumber,
                    userUpdateDetails.address,
                    userUpdateDetails.companyStatus.type,
                    JSON.stringify({
                        filename: imageFile.filename,
                        filePath: req.file ? filePath : imageFile.filePath,
                    }),
                    userUpdateDetails.bio,
                    userDetails.Customer_ID,
                ];
                DBQuery(sqlQuery, data, (err, result) => {
                    if (err) {
                        return console.log(
                            err,
                            "update customer profile error"
                        );
                    } else {
                        res.json(result);
                        return;
                    }
                });
            }
        });
    } catch (error) {
        console.log(error, "customerprofileerror");
    }
});

router.post("/maker-edit", (req, res) => {
    try {
        const upload = SingleFileUpload("profileImage", null);
        upload(req, res, async (err) => {
            console.log(req.body, "___________________________");
            var imageFile = req.file;
            const prevImage =
                req.body.prevImage !== "undefined"
                    ? JSON.parse(req.body.prevImage)
                    : null;
            const userDetails = JSON.parse(req.body.currentUser);
            const userUpdateDetails = JSON.parse(req.body.userUpdates);
            console.log(imageFile, userDetails, userUpdateDetails, "details");
            console.log(req.file, "file line 71");
            if (req.file) {
                console.log("inside if line 73");
                var dir = `./public/uploads/maker/${userDetails.Manufacturer_ID}/${imageFile.fieldname}/`;
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                if (prevImage && prevImage.filePath) {
                    FileDelete(prevImage.filePath);
                }
            } else {
                console.log("line 79");
                console.log(prevImage, "line 79");
                imageFile = prevImage;
            }

            if (err) {
                console.log(err, "error");
            } else {
                let tmp_path = imageFile.path;
                let target_path = dir + imageFile.filename;
                const filePath = await FileMove(tmp_path, target_path);
                console.log(userUpdateDetails, "user");
                const sqlQuery =
                    "UPDATE manufacturer SET Company_Name=?, Logo=?, Contact_Person=?,Email=?,Phone_Number=?, Address = ?, Brief_Description = ?, Additional_Details = ? WHERE Manufacturer_ID = ?";
                const data = [
                    userUpdateDetails.companyName,
                    JSON.stringify({
                        filename: imageFile.filename,
                        filePath: req.file ? filePath : imageFile.filePath,
                    }),
                    userUpdateDetails.contactPerson,
                    userUpdateDetails.email,
                    userUpdateDetails.phoneNumber,
                    userUpdateDetails.address,
                    userUpdateDetails.brief_description,
                    userUpdateDetails.additional_details,

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
    } catch {}
});

router.get("/maker-get-map", async (req, res) => {
    try {
        console.log("params");
        console.log(req.query[0], "params");
        const Manufacturer_ID = req.query[0];
        const getUserSql = "SELECT * FROM location WHERE Manufacturer_ID = ?";
        const userData = [Manufacturer_ID];
        const getLocation = await GetUserData(getUserSql, userData);

        console.log("getlocation", getLocation);
        if (getLocation.length > 0) {
            res.json(getLocation[0]);
            console.log("getlocation", getLocation);
            return;
        } else {
            console.log("no location set");
            return false;
        }
    } catch {
        return { msg: "Something Went Wrong" };
    }
});

router.post("/maker-map-edit", async (req, res) => {
    try {
        const { Manufacturer_ID, latitude, longitude } = req.body;
        const getUserSql = "SELECT * FROM location WHERE Manufacturer_ID = ?";
        const userData = [Manufacturer_ID];
        const checkUser = await GetUserData(getUserSql, userData);

        if (checkUser.length > 0) {
            let sqlQuery =
                "UPDATE location SET Latitude=?, Longitude=? WHERE Manufacturer_ID = ?";
            let data = [latitude, longitude, Manufacturer_ID];
            DBQuery(sqlQuery, data, (err, result) => {
                if (err) {
                    return console.log(
                        err,
                        "Location update failed. Something went wrong. please try again later"
                    );
                } else {
                    res.json(result);
                    return;
                }
            });
        } else {
            let sqlQuery =
                "INSERT INTO location (Manufacturer_ID, Latitude, Longitude) VALUES (?, ?, ?)";
            let data = [Manufacturer_ID, latitude, longitude];
            DBQuery(sqlQuery, data, (err, result) => {
                if (err) {
                    return console.log(
                        err,
                        "Location update failed. Something went wrong. please try again later"
                    );
                } else {
                    res.json(result);
                    return;
                }
            });
        }
    } catch {
        return { msg: "Something Went Wrong" };
    }
});

router.post("/maker-password-edit", async (req, res) => {
    try {
        const {
            Manufacturer_ID,
            old_password,
            new_password,
            confirm_password,
        } = req.body;
        console.log(
            old_password,
            new_password,
            confirm_password,
            "password body"
        );
        const getUserSql =
            "SELECT Password FROM manufacturer WHERE Manufacturer_ID = ?";
        const userData = [Manufacturer_ID];
        const currentPassword = await GetUserData(getUserSql, userData);
        console.log(currentPassword[0].Password, "current password");
        const checkPassword = await PasswordCheck(
            old_password,
            currentPassword[0].Password
        );
        if (checkPassword) {
            PasswordEncryption(new_password, (err, hash) => {
                const sqlQuery =
                    "UPDATE manufacturer SET Password=? WHERE Manufacturer_ID = ?";
                const data = [hash, Manufacturer_ID];
                DBQuery(sqlQuery, data, (err, result) => {
                    if (err) {
                        return console.log(
                            err,
                            "Password update failed. Something went wrong. please try again later"
                        );
                    } else {
                        res.json(result);
                        return;
                    }
                });
            });
        } else {
            res.json(false);
        }
    } catch {}
});

module.exports = router;
