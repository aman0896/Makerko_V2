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
const FileDelete = require("../Utils/FileDelete");
const {
    PasswordEncryption,
    PasswordCheck,
} = require("../Utils/passwordSecurity");
const { GetUserData } = require("../DBController/DBController");
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
            FileDelete(prevImage.filePath);
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
    router.post("/multiple-upload", async (req, res) => {
        console.log("profile check");
        const upload = MultipleFileUpload("profile", null);
        const dir = "./public/uploads/multipleUpload/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        upload(req, res, (err) => {
            if (err) {
                console.log(err, "error");
            } else {
                console.log(req.files, "req");
                const files = req.files;
                for (let i = 0; i < files.length; i++) {
                    let tmp_path = files[i].path;
                    console.log(tmp_path, "path");
                    let target_path =
                        "./public/uploads/multipleUpload/" + files[i].filename;
                    let src = fs.createReadStream(tmp_path);
                    let dest = fs.createWriteStream(target_path);
                    src.pipe(dest);
                    src.on("end", function () {
                        console.log("complete");
                    });
                    src.on("error", function (err) {
                        console.log("error");
                    });
                    src.on("close", function (err) {
                        console.log(tmp_path, "path");
                        fs.unlink(tmp_path, function (err) {
                            console.log(err);
                        });
                    });
                }

                //onsole.log(req.file.path, "pathhhh");
                //   var tmp_path = req.file.path;
                //   var target_path =
                //     "./public/uploads/customer/" +
                //     req.file.fieldname +
                //     Date.now() +
                //     path.extname(req.file.originalname);

                //   /** A better way to copy the uploaded file. **/
                //   var src = fs.createReadStream(tmp_path);
                //   var dest = fs.createWriteStream(target_path);
                //   src.pipe(dest);
                //   src.on("end", function () {
                //     console.log("complete");
                //   });
                //   src.on("error", function (err) {
                //     console.log("error");
                //   });
                //   src.on("close", function (err) {
                //     fs.unlink(tmp_path, function (err) {
                //       console.log(err);
                //     });
                //   });
            }
        });
    });
});

router.post("/maker-password-edit", async (req, res) => {
    const { Manufacturer_ID, old_password, new_password, confirm_password } =
        req.body;
    console.log(old_password, new_password, confirm_password, "password body");
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
});

module.exports = router;
