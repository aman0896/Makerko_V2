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

//#region customer profile edit api
router.post("/customer-edit", (req, res) => {
    try {
        const upload = SingleFileUpload("profileImage", null);
        upload(req, res, async (err) => {
            try {
                var imageFile = req.file;
                const prevImage =
                    req.body.prevImage !== "undefined"
                        ? JSON.parse(req.body.prevImage)
                        : null;

                const userDetails = JSON.parse(req.body.currentUser);
                const userUpdateDetails = JSON.parse(req.body.userUpdates);
                console.log(
                    imageFile,
                    userDetails,
                    userUpdateDetails,
                    "details"
                );
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
                        "UPDATE customer SET First_Name =?, Last_Name=?, Email=?, Phone_Number=?, Address=?, Profile_Image = ?, Bio = ? WHERE Customer_ID = ?";
                    const data = [
                        userUpdateDetails.firstName,
                        userUpdateDetails.lastName,
                        userUpdateDetails.email,
                        userUpdateDetails.phoneNumber,
                        userUpdateDetails.address,
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
            } catch {
                console.log("customerprofileerror");
            }
        });
    } catch (error) {
        console.log(error, "customerprofileerror");
    }
});

router.post("/customer-cover-edit", async (req, res) => {
    try {
        const upload = SingleFileUpload("cover");

        upload(req, res, async (err) => {
            try {
                if (err) return res.status(400).json(err);
                const coverImage = req.file;
                const u_Id = req.body.userId;
                const prevImage =
                    req.body.prevImage !== "undefined"
                        ? JSON.parse(req.body.prevImage)
                        : null;
                if (coverImage) {
                    var dir = `./public/uploads/customer/${u_Id}/`;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    if (prevImage && prevImage.filePath) {
                        FileDelete(prevImage.filePath);
                    }
                } else {
                    coverImage = prevImage;
                }

                let tmp_path = coverImage.path;
                let target_path = dir + coverImage.filename;

                const filePath = await FileMove(tmp_path, target_path);
                console.log(filePath, "filepath");
                const sqlQuery =
                    "UPDATE customer SET CoverImage=? WHERE Customer_ID = ?";
                const data = [
                    JSON.stringify({
                        filename: coverImage.filename,
                        filePath: req.file ? filePath : coverImage.filePath,
                    }),
                    u_Id,
                ];
                DBQuery(sqlQuery, data, (err, result) => {
                    if (err) return res.status(304).send(err);
                    res.json({ coverUpdate: "success" });
                });
            } catch {}
        });
    } catch (err) {
        console.log(err, "catch line 306 profile.js");
    }
});

//#endregion

//#region maker profile edit
router.post("/maker-edit", (req, res) => {
    try {
        const upload = SingleFileUpload("profileImage", null);
        upload(req, res, async (err) => {
            try {
                console.log(req.body, "___________________________");
                var imageFile = req.file;
                const prevImage =
                    req.body.prevImage !== "undefined"
                        ? JSON.parse(req.body.prevImage)
                        : null;
                const userDetails = JSON.parse(req.body.currentUser);
                const userUpdateDetails = JSON.parse(req.body.userUpdates);
                console.log(
                    imageFile,
                    userDetails,
                    userUpdateDetails,
                    "details"
                );
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
                        "UPDATE manufacturer SET Company_Name=?, Logo=?, Contact_Person=?,Email=?,Phone_Number=?, Address = ?, Website=?, Company_Type=?, Brief_Description = ?, Additional_Details = ?, Slogan=? WHERE Manufacturer_ID = ?";
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
                        userUpdateDetails.website,
                        userUpdateDetails.companyStatus.type,
                        userUpdateDetails.brief_description,
                        userUpdateDetails.additional_details,
                        userUpdateDetails.slogan,
                        userDetails.Manufacturer_ID,
                    ];
                    DBQuery(sqlQuery, data, (err, result) => {
                        if (err) {
                            return console.log(
                                err,
                                "update maker profile error"
                            );
                        } else {
                            res.json(result);
                            return;
                        }
                    });
                }
            } catch {}
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
                try {
                    if (err) {
                        return console.log(
                            err,
                            "Location update failed. Something went wrong. please try again later"
                        );
                    } else {
                        res.json(result);
                        return;
                    }
                } catch {}
            });
        } else {
            let sqlQuery =
                "INSERT INTO location (Manufacturer_ID, Latitude, Longitude) VALUES (?, ?, ?)";
            let data = [Manufacturer_ID, latitude, longitude];
            DBQuery(sqlQuery, data, (err, result) => {
                try {
                    if (err) {
                        return console.log(
                            err,
                            "Location update failed. Something went wrong. please try again later"
                        );
                    } else {
                        res.json(result);
                        return;
                    }
                } catch {}
            });
        }
    } catch {
        return { msg: "Something Went Wrong" };
    }
});

router.post("/password-edit", async (req, res) => {
    try {
        const { userID, old_password, new_password, confirm_password } =
            req.body;
        console.log(
            old_password,
            new_password,
            confirm_password,
            "password body"
        );
        const getMakerSql =
            "SELECT Password FROM manufacturer WHERE Manufacturer_ID = ?";
        const getCustomerSql =
            "SELECT Password FROM customer WHERE Customer_ID = ?";
        const userData = [userID];
        console.log(userID, "Id");
        const makerData = await GetUserData(getMakerSql, userData);
        const customerData = await GetUserData(getCustomerSql, userData);
        console.log(makerData, customerData, "Datas");
        if (makerData && makerData.length > 0) {
            console.log(makerData[0].Password, "current password");
            const checkPassword = await PasswordCheck(
                old_password,
                makerData[0].Password
            );
            if (checkPassword) {
                PasswordEncryption(new_password, (err, hash) => {
                    try {
                        const sqlQuery =
                            "UPDATE manufacturer SET Password=? WHERE Manufacturer_ID = ?";
                        const data = [hash, userID];
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
                    } catch {}
                });
            } else {
                res.json(false);
            }
        } else if (customerData && customerData.length > 0) {
            console.log(customerData[0].Password, "current password");
            const checkPassword = await PasswordCheck(
                old_password,
                customerData[0].Password
            );
            if (checkPassword) {
                PasswordEncryption(new_password, (err, hash) => {
                    try {
                        const sqlQuery =
                            "UPDATE customer SET Password=? WHERE Customer_ID = ?";
                        const data = [hash, userID];
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
                    } catch {}
                });
            } else {
                res.json(false);
            }
        }
    } catch {}
});

//maker cover image edit
router.post("/maker-cover-edit", async (req, res) => {
    try {
        const upload = SingleFileUpload("cover");

        upload(req, res, async (err) => {
            try {
                if (err) return res.status(400).json(err);
                const coverImage = req.file;
                console.log(coverImage, "image");
                const u_Id = req.body.userId;
                const prevImage =
                    req.body.prevImage !== "undefined"
                        ? JSON.parse(req.body.prevImage)
                        : null;
                console.log(prevImage, "prevImage");
                if (coverImage) {
                    console.log("inside if line 309");
                    var dir = `./public/uploads/maker/${u_Id}/`;
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    if (prevImage && prevImage.filePath) {
                        FileDelete(prevImage.filePath);
                    }
                } else {
                    console.log(prevImage, "line 322");
                    coverImage = prevImage;
                }
                let tmp_path = coverImage.path;
                let target_path = dir + coverImage.filename;
                const filePath = await FileMove(tmp_path, target_path);
                const sqlQuery =
                    "UPDATE manufacturer SET CoverImage=? WHERE Manufacturer_ID = ?";
                const data = [
                    JSON.stringify({
                        filename: coverImage.filename,
                        filePath: req.file ? filePath : coverImage.filePath,
                    }),
                    u_Id,
                ];
                DBQuery(sqlQuery, data, (err, result) => {
                    if (err) return res.status(304).send(err);
                    res.json({ coverUpdate: "success" });
                });
            } catch {}
        });
    } catch (err) {
        console.log(err, "catch line 306 profile.js");
    }
});

//#endregion

module.exports = router;
