const bcrypt = require("bcrypt");
const { get } = require("mobx");
const { CreateNewOTP } = require("../otpverify");
const { GenerateUid } = require("../Utils");
const saltRound = 10;

module.exports = function (app, db) {
    //#region manufacturer Registration process
    app.post("/manufacturer-signup", (req, res) => {
        const email = req.body.email;
        InsertMakerInfo(db, req.body, (err, result) => {
            if (err) {
                console.log(err, "makerSignup");
                return res.send({ message: "Email already exist" });
            }
            const hash = CreateNewOTP(email); //Create OTP and send mail to email
            if (hash) {
                res.json({
                    hash: hash,
                    message: "OTP has been sent to you email",
                });
            }
        });
    });
    //#endregion

    //#region Additional Details of Maker
    app.post("/maker-additional-details", (req, res) => {
        console.log(req.body, "body");

        AddAdditionalDetails(req.body, db, async (err, result) => {
            if (err) return console.log(err);
            console.log(result);
            res.send({ dataUpdate: true });
            // const data = await InsertServices(req.body, db);
            // if (data) {
            //     res.send({ message: 'Updated Sucessfully' });
            // }
        });
    });
    //#endregion

    //#region Update Location of maker
    app.post("/update-location", (req, res) => {
        updateLocation(req.body, db, (err, result) => {
            if (err) return console.log(err, "locationupdate");
            res.send({ locationUpdate: true });
        });
    });
    //#endregion

    //#region get Location of maker
    // app.get('/get-location', (req, res) => {
    //     const { makerID } = req.body;
    //     getLocation(makerID, db, (err, result) => {
    //         if (err) return console.log(err, 'getlocation');
    //         console.log(result, 'location found');
    //         res.send({ location: result });
    //     });
    // });
    //#endregion
};

//#region DBConnection for manufacturer
function InsertMakerInfo(db, makerInfo, getResult) {
    const {
        email,
        name,
        password,
        contactPerson,
        phoneNumber,
        website,
        manufacturerType,
        address,
        deliveryTime,
    } = makerInfo;
    const id = GenerateUid();
    console.log(id, "iidd");
    var registeredDate = new Date().toLocaleDateString();
    GetAllUsers(db, (err, result) => {
        if (err) return console.log(err, "getalluser");
        var index = result.findIndex((item) => item.Email == email);
        if (index === -1) {
            bcrypt.hash(password, saltRound, (err, hash) => {
                if (err) return console.log(err, "makerSignup");

                db.query(
                    "INSERT INTO manufacturer (Manufacturer_ID, Email, Date, Company_Name, Password, Contact_Person, Phone_Number, Website, Company_Type, Address, Delivery, Email_Verification, Account_Verification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
                    [
                        id,
                        email,
                        registeredDate,
                        name,
                        hash,
                        contactPerson,
                        phoneNumber,
                        website,
                        manufacturerType.type,
                        address,
                        deliveryTime,
                        "Not Verified",
                        "Not Verified",
                    ],
                    (err, result) => {
                        if (err) {
                            if (err.errno == 1062) {
                                errMessage = "Email Already Exist";
                                getResult(errMessage, null);
                                return console.log("makerSignup", err);
                            } else {
                                getResult(err, null);
                                return console.log(err, "makerSignup");
                            }
                        }
                        getResult(null, result);
                    }
                );
            });
        } else {
            errMessage = "Email Already Exist";
            getResult(errMessage, null);
        }
    });
}
//#endregion

//#region add additional details in db
function AddAdditionalDetails(additionalDetails, db, getResult) {
    console.log("additionaldetails", additionalDetails);
    const {
        uid,
        otherServices,
        documentFile,
        logo,
        coverImage,
        slogan,
        multipleImage,
    } = additionalDetails;

    const sql =
        "UPDATE manufacturer SET Document_Path=?, Logo=?, CoverImage=?, Other_Services=?, Account_Verification = ?, Slogan = ?, Additional_Images = ? WHERE Manufacturer_ID = ?";

    db.query(
        sql,
        [
            documentFile,
            logo,
            coverImage,
            otherServices,
            "Verified",
            slogan,
            multipleImage,
            uid,
        ],
        (err, result) => {
            if (err) {
                getResult(err, null);
                return console.log("dberr", err);
            }
            getResult(null, result);
        }
    );
}
//#endregion

//#region Insert Manufacturer services in DB
function InsertServices(services, db) {
    const { uid } = services;
    const serviceList = JSON.parse(services.serviceList);
    return new Promise((resolve) => {
        const sql =
            "INSERT INTO services (Service_ID, Manufacturer_ID, Material_Name) VALUES (?, ?, ?)";
        if (serviceList.length > 0) {
            console.log(serviceList);
            serviceList.map((service) => {
                const serviceID = service.selectedFabrication.Service_ID;
                const materialNames = JSON.stringify(service.materialDetails);
                db.query(
                    sql,
                    [serviceID, uid, materialNames],
                    async (err, result) => {
                        if (err) {
                            return { err: err };
                        }
                        resolve(result);
                    }
                );
            });
        }
    });
}
//#endregion

//#region Insert location of maker in DB
function InsertLocation(location, db) {
    const { uid, latitude, longitude } = location;
    const sql =
        "INSERT INTO location (Manufacturer_ID, Longitude, Latitude) VALUES (?, ?, ?)";
    db.query(sql, [uid, latitude, longitude], (err, result) => {
        console.log("300", err);
        if (err) {
            return { err: err };
        }
        return result;
    });
}
//#endregion

//#region Insert and Update location
function updateLocation({ uid, latitude, longitude }, db, getResult) {
    const sqlInsert =
        "INSERT INTO location (Manufacturer_ID, Latitude, Longitude) VALUES (?, ?, ?)";

    const sqlUpdate =
        "UPDATE location SET Latitude = ?, Longitude = ? WHERE Manufacturer_ID = ?";

    db.query(sqlInsert, [uid, latitude, longitude], (err, result) => {
        if (err) {
            if (err.errno == 1062) {
                db.query(
                    sqlUpdate,
                    [latitude, longitude, uid],
                    (err, result) => {
                        if (err) {
                            getResult(err, null);
                            return console.log("updatelocation", err);
                        }
                        return getResult(null, result);
                    }
                );
            }
        }
        if (!err) return getResult(null, result);
    });
}
//#endregion

//#region get location of maker
function getLocation(uid, db, sendResponse) {
    console.log(uid);
    sql = "SELECT * FROM location WHERE Manufacturer_ID = ?";

    db.query(sql, [85], (err, result) => {
        if (err) return console.log(err, "getlocation");
        console.log(result, "getlocation");
        sendResponse(null, result[0]);
    });
}
//#endregion

//#region get existing email
function GetAllUsers(db, getUser) {
    sql = "SELECT Email FROM customer UNION ALL SELECT Email FROM manufacturer";

    db.query(sql, (err, result) => {
        if (err) console.log(err);
        else {
            getUser(null, result);
        }
    });
}
//#endregion
