const express = require("express");
const db = require("./DBController/DBConnect");
const nodemailer = require("nodemailer");
const fileUPload = require("express-fileupload");
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();
const server = require("http").createServer(app);
const saltRound = 10;
var cookieParser = require("cookie-parser");
var fs = require("fs");
const jwt = require("jsonwebtoken");
const { CreateNewOTP, verifyOTP, GenerateOTP } = require("./otpverify");
const { SendOrderSpecificationMail } = require("./nodemailer");
const projectPath = path.dirname(process.cwd());
require("dotenv").config({ path: path.join(projectPath, ".env") });
const { NodeMailer } = require("./nodemailer");
const transporter = NodeMailer();
const { GetCookieDetail } = require("./Utils");
//#region init routes
//#endregion
console.log(process.env.File_Server, "checks");

// var ipAddress = "172.31.32.139";
// var hostAddress = "https://makerko.com";

var ipAddress = "192.168.88.182";
var hostAddress = "http://192.168.88.182:3000";

// var ipAddress = "192.168.1.103";
// var hostAddress = "http://192.168.1.103:5000";

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Origin", hostAddress);
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
    );
    next();
});
app.use(express.json());
app.use(fileUPload());
app.use(cookieParser());

//Serve the static files from the React app
app.use(
    "/counselling/triage/",
    express.static(path.join(projectPath, "build"))
);

//#region variable define
var otp = null;
var email = null;
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;
const generateID =
    //#endregion

    //#region Registration process
    app.post("/register", (req, res) => {
        //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const email = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const address = req.body.address;
        GetAllUsers(db, (err, result) => {
            if (err) return console.log(err, "getalluser");
            var index = result.findIndex((item) => item.Email == email);
            if (index == -1) {
                bcrypt.hash(password, saltRound, (err, hash) => {
                    db.query(
                        "INSERT INTO customer (First_Name, Last_Name, Password, Email, Phone_Number, Address, Verified) VALUES (?,?,?,?,?,?,?)",
                        [
                            firstName,
                            lastName,
                            hash,
                            email,
                            phoneNumber,
                            address,
                            0,
                        ],
                        (err, result) => {
                            console.log("dgvdgcv", err);
                            if (err) {
                                if (err.errno == 1062) {
                                    console.log("userSignup", err);
                                    return res.send({
                                        message: "Email already exist",
                                    });
                                }
                                return console.log(err);
                            }

                            const fullHash = CreateNewOTP(email); //Create OTP and send mail to email
                            res.json({ hash: fullHash });
                        }
                    );
                });
            } else return res.send({ message: "Email already exist" });
        });
    });
//#endregion

// imports makerSignup module.
require("./routes/maker")(app, db);

//#region Add project
app.post("/feature-project", (req, res) => {
    const id = req.body.id;
    const process = req.body.process;
    const material = req.body.material;
    const userinfo = req.body.userinfo;
    const date = req.body.date;
    const title = req.body.title;
    const summary = req.body.summary;
    const data = req.body.data;
    const fileName = req.body.fileName;
    const url = req.body.fileURL;
    const description = req.body.description;
    const fileList = req.body.files;
    const image = req.body.image;
    const pdfFileUrl = req.body.pdfUrl;
    const coverImage = req.body.coverImage;

    console.log("feature-project", fileList);

    db.query(
        "INSERT INTO feature_project (Email,Customer_ID, Fabrication_Process, Material, Date, Title, Summary, Description, Files, Image, PDF_Document, Cover_Image) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
        [
            userinfo,
            id,
            process,
            material,
            date,
            title,
            summary,
            description,
            fileList,
            image,
            pdfFileUrl,
            coverImage,
        ],
        (err, result) => {
            console.log(err, id);
            if (err) return console.log(err);
            //  console.log(result);
            res.send({ projectUpdate: true });
        }
    );
});
//#endregion

//#region Update project
app.post("/update-project", (req, res) => {
    const process = req.body.process;
    const material = req.body.material;
    const date = req.body.date;
    const title = req.body.title;
    const summary = req.body.summary;
    const data = req.body.data;

    console.log("filesss", req.body.file);
    const fileName = req.body.file;
    const url = req.body.fileURL;
    const description = req.body.description;

    const projectID = req.body.projectID;
    const pdfFileUrl = req.body.pdfUrl;

    db.query(
        "UPDATE feature_project SET  Fabrication_Process=?, Material=?, Date=?, Title=?, Summary=?, Description=?, Files=?,  PDF_Document=? WHERE Project_ID = ?",
        [
            process,
            material,
            date,
            title,
            summary,
            description,
            fileName,
            pdfFileUrl,
            projectID,
        ],
        (err, result) => {
            console.log(err, "update");

            if (err) return console.log(err);
            // console.log(result);
            res.send({ projectUpdate: true });
        }
    );
});
//#endregion

//#region Get all the list of projects
app.get("/feature-project", (req, res) => {
    db.query("SELECT * FROM feature_project", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        //console.log(result);
        if (result.length > 0) {
            res.send(result);
        }
    });
});
//#endregion

//#region edit project
app.post("/edit-project", (req, res) => {
    const id = req.body.id;
    console.log("id", id);
    var userID;
    const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);

    console.log("user", currentUser);

    db.query(
        "SELECT * FROM feature_project WHERE Project_ID=?",
        [id],
        (err, result) => {
            if (err) {
                console.log("error", err);
            } else {
                console.log(result, "reeeee");
                if (result.length > 0) {
                    userID = result[0].Customer_ID;
                    console.log(result[0].Customer_ID, 55);
                    if (currentUser != undefined && userID == currentUser.uid) {
                        console.log(result, "reeeee");
                        res.send(result);
                    } else {
                        console.log("wrong");
                        res.send({ wrongProject: true });
                    }
                } else {
                    console.log("wrong11");
                    res.send({ wrongProject: true });
                }
            }
        }
    );
});
//#endregion

app.post("/project/:id", (req, res) => {
    const id = req.params.id;
    console.log("id123", id);
    const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);
    // console.log("user",currentUser)
    db.query(
        "SELECT * FROM feature_project WHERE Project_ID=?",
        [id],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            }
        }
    );
});

//#region Delete project
app.post("/delete-project", (req, res) => {
    const id = req.body.id;

    db.query(
        "DELETE FROM feature_project WHERE Project_ID=?",
        [id],
        (err, result) => {
            console.log(err);

            console.log(result, "delete");
        }
    );
});
//#endregion

//#region verifying OTP And Updating Current User information by adding otp
app.post("/verify", (req, res) => {
    const inputOtp = req.body.otp;
    const email = req.body.email;
    const hash = req.body.hash;
    console.log("user", email, inputOtp, hash);
    const verified = verifyOTP(email, hash, inputOtp);
    console.log(verified);
    if (verified) {
        db.query(
            "SELECT Email from customer WHERE Email = ?",
            [email],
            (err, result) => {
                if (err) {
                    return console.log("verify-err", err);
                } else if (result.length > 0) {
                    db.query(
                        "UPDATE customer SET Verified =? WHERE email = ?",
                        [1, email],
                        (err, result) => {
                            if (err) {
                                return console.log("verification Error", err);
                            }
                            res.status(200).json({
                                msg: "You has been successfully registered",
                                isVerified: true,
                            });
                        }
                    );
                } else {
                    db.query(
                        "UPDATE manufacturer SET Email_Verification =? WHERE email = ?",
                        ["Verified", email],
                        (err, result) => {
                            if (err) {
                                return console.log("verification Error", err);
                            }
                            res.status(200).json({
                                msg: "You has been successfully registered",
                                isVerified: true,
                            });
                        }
                    );
                }
            }
        );
    } else {
        res.send({ msg: "Incorrect Code", isVerified: false });
    }
});
//#endregion

//#region change password
app.post("/new-password", (req, res) => {
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const email = req.body.email;
    console.log(email);
    bcrypt.hash(password, saltRound, (err, hash) => {
        db.query(
            "SELECT * FROM customer  WHERE Email = ?",
            [email],
            (err, result) => {
                console.log(err);
                console.log("pass", result.length);
                if (result.length === 0) {
                    console.log("manufacturer");
                    db.query(
                        "UPDATE manufacturer SET Password =? WHERE Email = ?",
                        [hash, email]
                    );
                } else {
                    console.log("customer");
                    db.query(
                        "UPDATE customer SET Password =? WHERE Email = ?",
                        [hash, email]
                    );
                }
            }
        );
    });

    res.send({ msg: "Password updated" });
});
//#endregion

//#region Login Process Check
// imports makerSignup module.
require("./routes/login")(app, db);
//#endregion

//#region get file detail for validaton - page
app.post("/validation-page", (req, res) => {
    const sql = "SELECT * FROM cadfiles WHERE uploadedby = ?";
    db.query(sql, [email], (err, result) => {
        if (err) {
            return err;
        }
        //console.log(result);
        if (result.length > 0) {
            let fileinfo = {
                filename: result[0].filename,
                filepath: `/uploads/${result[0].filename}`,
                email: email,
            };
            //console.log(fileinfo);
            res.send({ fileinfo });
        }
    });
});
//#endregion

//#region verify form when login if not verfied
app.post("/verify-login", (req, res) => {
    const email = req.body.email;
    const hash = CreateNewOTP(email);
    if (hash) {
        res.json({ hash: hash, message: "OTP has been sent to you email" });
    }
});
//#endregion
var location = null;

//#region Check email if exsit when reset password
const ResetPassword = require("./routes/resetPassowrd");
app.use("", ResetPassword);
//#endregion

console.log(location);
app.post("/verify-password", (req, res) => {
    console.log(location);
    res.send({ locate: location });
});

//#region Importing fabrication services from database
app.post("/fabricationservice", (req, res) => {
    db.query("SELECT * FROM fabrication_services", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        if (result.length > 0) {
            res.send(result);
        }
    });
});
//#endregion

//#region get material from db
app.post("/materials", (req, res) => {
    const fabricationID = req.body.fabricationID;
    db.query(
        "SELECT * FROM materials WHERE Service_ID = ?",
        [fabricationID],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                res.send(result);
                console.log(result);
            }
        }
    );
});
//#endregion

//#region importing fileUpload route
require("./routes/fileUpload")(app);
//#endregion

//#region order_specificaton
app.post("/order-specification", (req, res) => {
    console.log(req.body.manufacturerEmail, req.body.userEmail);
    try {
        console.log(req.body.orderType, "orderType");
        const modelName = req.body.modelName;
        const fabricationService = req.body.fabricationService;
        const material = req.body.material;
        const thickness = req.body.thickness;
        const quantity = req.body.quantity;
        const modelPath = req.body.modelPath;
        const userId = req.body.userId;
        const userEmail = req.body.userEmail;
        const username = req.body.username;
        const manufacturerID = req.body.manufacturerID;
        const manufacturerEmail = req.body.manufacturerEmail;
        const orderType = req.body.orderType;
        const status = "Pending";
        const amount = 100;
        const date = new Date().toLocaleString().split(",")[0];
        const validationPagePath = req.body.validationPagePath;
        const orderStatusPagePath = req.body.orderStatusPagePath;

        if (
            modelName != null &&
            fabricationService != null &&
            material != null &&
            thickness != null &&
            quantity != null &&
            modelPath != null &&
            userId != null &&
            manufacturerID != null
        ) {
            db.query(
                "INSERT INTO order_specification (Order_Type, Model_Name, Fabrication_Service, Material, Thickness, Quantity, Model_Path, Customer_ID, Manufacturer_ID, Status, Amount, Date) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                    JSON.stringify(orderType),
                    modelName,
                    fabricationService,
                    material,
                    thickness,
                    quantity,
                    modelPath,
                    userId,
                    manufacturerID,
                    status,
                    amount,
                    date,
                ],
                async (err, result) => {
                    console.log(err);
                    if (!err) {
                        const mailSent = await SendOrderSpecificationMail(
                            validationPagePath,
                            orderType,
                            manufacturerEmail,
                            userEmail,
                            username,
                            orderStatusPagePath
                        );
                        res.json(mailSent);
                    }
                }
            );
        } else {
            console.log("error");
        }
    } catch {}
});
//#endregion

//#region get hublist from fabricationService
app.post("/hublist", (req, res) => {
    try {
        const fabricationService = req.body.fabricationService;
        db.query(
            "SELECT m.Manufacturer_ID, m.Company_Name, m.Email, m.Contact_Person, m.Website, s.Material_Name, m.Phone_Number, m.Logo, m.Brief_Description, m.Address, fs.Name FROM manufacturer m INNER JOIN services s ON m.Manufacturer_ID = s.Manufacturer_ID INNER JOIN fabrication_services fs ON fs.Service_ID = s.Service_ID WHERE fs.Name = ?",
            [fabricationService],
            (err, result) => {
                if (!err && result.length > 0) {
                    console.log(result);
                    res.send(result);
                } else {
                    res.send();
                }
            }
        );
    } catch {}
});
//#endregion

//#region get page info(validation page)
app.get("/validation", (req, res) => {
    try {
        console.log("connected");
        db.query(
            "SELECT * FROM order_specification",
            (err, orderSpecification) => {
                if (err) {
                    return console.log(err);
                }
                console.log("---------***--------", orderSpecification);
                res.json({
                    orderSpecification,
                });
            }
        );
    } catch (err) {
        console.log(err);
    }
});
//#endregion

app.post("/imageupload", function (req, res) {
    console.log(req.files);
    if (req.files.file === null) {
        return res.status(400).json({ msg: "No file uploaded" });
    }
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    const files = req.files.file;
    const path = req.body.document;
    let uploadedFiles = [];
    console.log("length", files.length, req.body.type);

    if (files != null && files.length > 0) {
        files.forEach((file) => {
            const uploadPath = `${projectPath}/public/${path}/${file.name}`;
            if (!fs.existsSync(uploadPath)) {
                file.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                });
                uploadedFiles = uploadedFiles.concat({
                    fileName: file.name,
                    filePath: `/projectUploads/${file.name}`,
                });
            } else {
                fs.unlink(uploadPath, async (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("delete");
                    }
                });

                file.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    } else {
                        console.log("file uploaded");
                    }
                });

                uploadedFiles = uploadedFiles.concat({
                    fileName: file.name,
                    filePath: `/projectUploads/${file.name}`,
                });
            }
        });
        console.log("file", uploadedFiles);
        res.send(uploadedFiles);
    } else {
        const file = files;
        const FileName = file.name.split(".")[0];
        const shortFileName = FileName.split(" ")[0];
        const getExt = file.name.split(".")[1];
        const currentDate = new Date().getTime();
        const id = Math.floor(Math.random() * 10000);
        var fileName = shortFileName + "_" + id + "." + getExt;
        var uploadPath = `${projectPath}/public/${path}/${fileName}`;
        console.log("filename", fileName, Math.floor(Math.random() * 10000));

        // if (path === 'profileImage') {
        //     var fileName = 'image' + currentDate + '.' + getExt;
        //     var uploadPath = `${projectPath}/public/${path}/${fileName}`;
        // } else {
        //     var fileName = file.name;
        //     var uploadPath = `${projectPath}/public/${path}/${fileName}`;
        //     console.log('documents', fileName);
        // }

        if (!fs.existsSync(uploadPath)) {
            file.mv(uploadPath, (err) => {
                if (err) {
                    console.error("existerror", err);
                    return res.status(500).send(err);
                }
            });
            res.send({
                fileName: fileName,
                filePath: `/${path}/${fileName}`,
            });
        }
        // else {
        //     fs.unlink(uploadPath, async (err) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log('delete');
        //         }
        //     });
        //     file.mv(uploadPath, (err) => {
        //         if (err) {
        //             console.error(err);
        //             //return res.status(500).send(err);
        //         }
        //     });
        //     res.json({
        //         fileName: newFileName,
        //         filePath: `/${path}/${newFileName}`,
        //     });
        // }
    }
});

app.post("/changeimage", (req, res) => {
    const id = req.body.id;
    const image = req.body.image;
    const userStatus = req.body.userStatus;
    if (userStatus === "customer") {
        db.query(
            "UPDATE customer SET Profile_Image =? WHERE Customer_ID = ?",
            [image, id],
            (err, result) => {
                console.log(err);
                if (result) {
                    db.query(
                        "SELECT * FROM customer WHERE Customer_ID  = ?",
                        [id],
                        (err, result) => {}
                    );
                }
            }
        );
    } else if (userStatus === "maker") {
        db.query(
            "UPDATE manufacturer SET Logo =? WHERE Manufacturer_ID = ?",
            [image, id],
            (err, result) => {
                console.log(err);
                if (result) {
                    db.query(
                        "SELECT * FROM customer WHERE Manufacturer_ID  = ?",
                        [id],
                        (err, result) => {
                            console.log(result);
                        }
                    );
                }
            }
        );
    } else {
        db.query(
            "UPDATE feature_project SET Image =? WHERE Project_ID = ?",
            [image, id],
            (err, result) => {
                if (result) {
                    db.query(
                        "SELECT * FROM feature_project WHERE Project_ID  = ?",
                        [id],
                        (err, result) => {}
                    );
                }
            }
        );
    }
});
app.post("/changeCoverImage", (req, res) => {
    const id = req.body.id;
    const image = req.body.image;
    const userStatus = req.body.userStatus;

    db.query(
        "UPDATE feature_project SET Cover_Image =? WHERE Project_ID = ?",
        [image, id],
        (err, result) => {
            if (result) {
                db.query(
                    "SELECT * FROM feature_project WHERE Project_ID  = ?",
                    [id],
                    (err, result) => {}
                );
            }
        }
    );
});

//#region Get List of all Registered Hub
app.post("/registeredhubs", (req, res) => {
    try {
        db.query(
            "SELECT * FROM manufacturer WHERE Account_Verification = ?",
            ["Verified"],
            (err, manufacturerList) => {
                if (!err && manufacturerList.length > 0) {
                    let sql =
                        "SELECT fs.Name, s.Material_Name, s.Manufacturer_ID" +
                        " " +
                        "FROM services s" +
                        " " +
                        "INNER JOIN fabrication_services fs" +
                        " " +
                        "ON fs.Service_ID = s.Service_ID";
                    db.query(sql, (err, serviceList) => {
                        console.log("registeredhubs", err);
                        if (!err && serviceList.length > 0) {
                            console.log(manufacturerList, serviceList);
                            res.send({ manufacturerList, serviceList });
                        }
                    });
                }
            }
        );
    } catch {}
});
//#endregion

//#region get specific hubs from hubID from db
app.get("/manufacturer/:id/:companyname", (req, res) => {
    const id = req.params.id;
    const companyName = req.params.companyname;
    console.log("manufacturer", id, companyName);
    db.query(
        "SELECT * FROM manufacturer WHERE Manufacturer_ID = ? AND Company_Name = ?",
        [id, companyName],
        (err, currentHub) => {
            if (currentHub.length > 0) {
                db.query(
                    "SELECT fs.Name, fs.Service_ID, s.Material_Name, s.Manufacturer_ID " +
                        "FROM services s " +
                        "INNER JOIN fabrication_services fs " +
                        "ON fs.Service_ID = s.Service_ID WHERE s.Manufacturer_ID = ? ",
                    [id],
                    (err, hubServices) => {
                        res.send({ hub: currentHub, services: hubServices });
                    }
                );
            } else {
                res.status(404).json("Hub Not found");
            }
        }
    );
});
//#endregion

//#region get hub services form hubID
app.post("/get-hub-services", (req, res) => {
    const hubID = req.body.hubID;
    console.log(hubID);
    const sql =
        "SELECT fs.Name, s.Manufacturer_ID FROM services s INNER JOIN fabrication_services fs ON fs.Service_ID = s.Service_ID WHERE s.Manufacturer_ID = ?";
    db.query(sql, [hubID], (err, hubService) => {
        console.log("error", err);
        if (hubService) {
            res.send(hubService);
            console.log("result", hubService);
        }
    });
});
//#endregion

app.get("/date", (req, res) => {
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    res.send(date.toUTCString());
});

//#region customer Profile
app.post("/editProfile", (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const id = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;

    db.query(
        "UPDATE customer SET First_Name =?,Last_Name=?,Email=?,Phone_Number=?,Address=? WHERE Customer_ID = ?",
        [firstname, lastname, email, phonenumber, address, id],
        (err, result) => {
            console.log("errrr", err);
            if (err) {
                if (err.errno == 1062) {
                    res.send({ error: "Email already exists" });
                    return console.log("cusotmer-profile-edit", err);
                }
            } else res.send({ msg: "Profile Updated Successfully" });
        }
    );
});
//#endregion

//#region get specific customer from customerID from db
app.post("/customer/:id", (req, res) => {
    const id = req.params.id;
    const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);
    console.log("userInfo", currentUser.uid);
    console.log("1349", id);
    console.log(currentUser);
    if (currentUser != undefined && id == currentUser.uid) {
        db.query(
            "SELECT * FROM customer WHERE Customer_ID = ?",
            [id],
            (err, response) => {
                if (response) {
                    console.log(response);
                    res.send(response);
                }
            }
        );
    } else {
        res.send({ wrongUser: true });
    }
});
//#endregion

//#region get orderStatus page
app.post(`/:id/order-status`, (req, res) => {
    try {
        const id = req.params.id;
        const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);
        console.log(currentUser.uid, id);
        if (currentUser.uid == id) {
            console.log("orderList");
            db.query(
                "SELECT * FROM order_specification WHERE Customer_ID =?",
                [id],
                (err, orderList) => {
                    console.log(err);
                    if (!err && orderList.length > 0) {
                        res.send(orderList);
                    } else {
                        db.query(
                            "SELECT * FROM order_specification WHERE Customer_ID =?",
                            [id],
                            (err, orderList) => {
                                console.log(err);
                                if (!err && orderList.length > 0) {
                                    res.send({ orderList: orderList });
                                } else {
                                    db.query(
                                        "SELECT * FROM order_specification WHERE Manufacturer_ID =?",
                                        [id],
                                        (err, orderList) => {
                                            if (!err && orderList.length > 0) {
                                                res.send({
                                                    orderList: orderList,
                                                });
                                            } else {
                                                res.send({ wrongUser: false });
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    }
                }
            );
        } else {
            res.send({ wrongUser: true });
        }
    } catch (err) {
        console.log(err);
    }
});
//#endregion

//#region Update OrderStatusPage
app.post("/update-order-status", (req, res) => {
    const updatedStatus = req.body.updatedStatus;
    const orderID = req.body.orderID;
    const sql = "UPDATE order_specification SET Status = ? WHERE Order_ID = ?";
    db.query(sql, [updatedStatus, orderID], (err, result) => {
        if (err) {
            console.log(err);
        }
    });
});
//#endregion

app.post("/editManufacturerProfile", (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const id = req.body.id;
    const companyName = req.body.companyName;
    const contactPerson = req.body.contactPerson;
    const email = req.body.email;
    const phonenumber = req.body.phonenumber;
    const address = req.body.address;
    const { briefDescription, additionalDetail } = req.body;
    console.log(req.body);

    db.query(
        "UPDATE manufacturer SET Company_Name=?, Contact_Person=?,Email=?,Phone_Number=?, Address = ?, Brief_Description = ?, Additional_Details = ? WHERE Manufacturer_ID = ?",
        [
            companyName,
            contactPerson,
            email,
            phonenumber,
            address,
            briefDescription,
            additionalDetail,
            id,
        ],
        (err, result) => {
            if (err) {
                res.send({ error: "Email already exists" });
                return console.log("maker-profile-edit", err);
            } else res.send({ msg: "Profile Updated Successfully" });
        }
    );
});

app.post("/change-password", (req, res) => {
    //requesting value(firstname, lastname, password, email, phonenumber from registrarion page input)
    const id = req.body.id;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    const userStatus = req.body.userStatus;

    if (userStatus == "customer") {
        db.query(
            "SELECT * FROM customer WHERE Customer_ID  = ?",
            [id],
            (err, result) => {
                if (result) {
                    bcrypt.compare(
                        old_password,
                        result[0].Password,
                        (error, response) => {
                            if (response) {
                                console.log("match", response);
                                bcrypt.hash(
                                    new_password,
                                    saltRound,
                                    (err, hash) => {
                                        db.query(
                                            "UPDATE customer SET Password =? WHERE Customer_ID = ?",
                                            [hash, id],
                                            (err, result) => {
                                                console.log("change");
                                                res.send({
                                                    msg: "Password Changed Sucessfully",
                                                });
                                            }
                                        );
                                    }
                                );
                            } else {
                                res.send({
                                    message: "Old password did not match",
                                });
                            }
                        }
                    );
                }
            }
        );
    } else {
        db.query(
            "SELECT * FROM manufacturer WHERE Manufacturer_ID  = ?",
            [id],
            (err, result) => {
                if (result) {
                    bcrypt.compare(
                        old_password,
                        result[0].Password,
                        (error, response) => {
                            if (response) {
                                console.log("matchmanufacturer", response);
                                bcrypt.hash(
                                    new_password,
                                    saltRound,
                                    (err, hash) => {
                                        db.query(
                                            "UPDATE manufacturer SET Password =? WHERE Manufacturer_ID = ?",
                                            [hash, id],
                                            (err, result) => {
                                                console.log(
                                                    "updated",
                                                    new_password
                                                );
                                                res.send({
                                                    msg: "Password Changed Sucessfully",
                                                });
                                            }
                                        );
                                    }
                                );
                            } else {
                                res.send({
                                    message: "Old password did not match",
                                });
                            }
                        }
                    );
                }
            }
        );
    }
});

//#region services_db
app.post("/update-services/:id", (req, res) => {
    const m_id = req.params.id;
    const hubServices = req.body.hubService;
    if (m_id && hubServices && hubServices.length > 0) {
        const sql = "DELETE FROM services WHERE Manufacturer_ID = ?";
        db.query(sql, [m_id], async (err, result) => {
            if (err) {
                return console.log("service-delete", err);
            } else {
                var serviceUpdate = false;
                await new Promise((resolve) => {
                    hubServices.forEach((hubService) => {
                        const serviceID =
                            hubService.selectedFabrication.Service_ID;
                        const materialDetails = JSON.stringify(
                            hubService.materialDetails
                        );
                        const sql =
                            "INSERT INTO services (Service_ID, Manufacturer_ID, Material_Name) VALUES (?, ?, ?)";
                        const result = db.query(
                            sql,
                            [serviceID, m_id, materialDetails],
                            (err, result) => {
                                if (err) {
                                    return resolve((serviceUpdate = false));
                                } else {
                                    return resolve((serviceUpdate = true));
                                }
                            }
                        );
                    });
                });
                res.send({ serviceUpdate: serviceUpdate });
            }
        });
    } else {
        res.send({ serviceNull: true });
    }
});

//#endregion

app.post("/update-details", (req, res) => {
    const briefDescription = req.body.briefDescriptiom;
    const additionalDetails = req.body.additionalDetails;
    const id = req.body.id;
    const sql =
        "UPDATE manufacturer SET Brief_Description = ?, Additional_Details = ? WHERE Manufacturer_ID = ?";
    db.query(sql, [briefDescription, additionalDetails, id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

//#region get cookie - userinfo
app.post("/get-cookie-info", (req, res) => {
    const accessToken = req.cookies.uid;
    jwt.verify(accessToken, JWT_AUTH_TOKEN, (err, userInfo) => {
        if (userInfo) {
            res.send({ userInfo: userInfo });
        } else {
            res.send({ userLoggedIn: false });
        }
    });
});
//#endregion

//#region userLogout - clear cookie
app.post("/logout", (req, res) => {
    res.status(202).clearCookie("uid").send("cookies delete");
});
//#endregion

//#region get customerInfo
app.post("/get-user-info", (req, res) => {
    const uid = req.body.uid;

    db.query(
        "SELECT * FROM customer WHERE Customer_ID = ?",
        [uid],
        (err, customerInfo) => {
            if (err) {
                res.send({ err: err });
                console.log(err);
            } else if (customerInfo.length > 0) {
                res.send(customerInfo);
            } else {
                db.query(
                    "SELECT * FROM manufacturer WHERE Manufacturer_ID = ?",
                    [uid],
                    (err, makerInfo) => {
                        if (err) {
                            res.send({ err: err });
                            console.log(err);
                        } else if (makerInfo.length > 0) {
                            res.send(makerInfo);
                        }
                    }
                );
            }
        }
    );
});
//#endregion

// Start download any File or images
app.post("/download/", function (req, res) {
    const path = req.body.filedir;
    const filedir = `${path}`;
    console.log(filedir);
    //console.log(filedir);
    if (filedir) {
        const file = `${projectPath}/public/${filedir}`;

        fs.access(file, fs.F_OK, (err) => {
            if (err) {
                console.error("no Such File or Directory");
                res.sendStatus(404);
                return;
            } else {
                res.download(file); // Set disposition and send it.
                return;
            }
        });
    } else {
        res.send({ imageurl: false });
        res.sendStatus(200);
    }
});
// End download any File or images

//#region store contact-us
app.post("/contact-us", (req, res) => {
    const email = req.body.email;
    const phoneNumber = req.body.material;
    const address = req.body.address;
    const message = req.body.message;
    db.query(
        "INSERT INTO contact_us (Email, Phone_Number, Address, Message) VALUES (?,?,?,?)",
        [email, phoneNumber, address, message]
    );
});
//#endregion

//importing routes
require("./routes/requestDesign")(app, db, hostAddress);
require("./routes/ratings")(app, db);

//#region get existing email
function GetAllUsers(db, getUser) {
    console.log("check");
    sql = "SELECT Email FROM customer UNION ALL SELECT Email FROM manufacturer";

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
            getUser(null, result);
        }
    });
}
//#endregion

//Handle any request that don't match the ones above
const root = path.join(projectPath, "build");

app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
});

server.listen(3001, `${ipAddress}`, () => {
    console.log("running server");
});
