const express = require("express");
const crypto = require("crypto");
const { GetAllUsersData } = require("../DBController/DBController");
const { PasswordEncryption } = require("../Utils/passwordSecurity");
const { DBQuery } = require("../DBController/DatabaseQuery");
const { CreateHash } = require("../Utils/OTP");
const router = express.Router();
const db = require("../DBController/DBConnect");
const { MultipleFileUpload } = require("../Utils/MultarFileUpload");
const path = require("path");
const projectPath = path.dirname(process.cwd());
var fs = require("fs");
const { FileMove } = require("../Utils/Operations");
const FileDelete = require("../Utils/FileDelete");

router.post("/maker-signup", async (req, res) => {
  console.log(req.body, "info");
  const id = GenerateUid();
  console.log(id, "iidd");
  var registeredDate = new Date().toLocaleDateString();

  const {
    companyName,
    phoneNumber,
    address,
    contactPerson,
    email,
    password,
    website,
    companyStatus,
    delivery,
  } = req.body;
  const sqlQuery =
    "INSERT INTO manufacturer (Manufacturer_ID, Email, Date, Company_Name, Password, Contact_Person, Phone_Number, Website, Company_Type, Address, Delivery, Email_Verification, Account_Verification) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

  const data = await GetAllUsersData();
  var index = data.findIndex((item) => item.Email === email);
  if (index == -1) {
    PasswordEncryption(password, (err, hash) => {
      if (err) {
        console.log(err, "password hasing error");
        return err;
      }
      const params = [
        id,
        email,
        registeredDate,
        companyName,
        hash,
        contactPerson,
        phoneNumber,
        website,
        companyStatus.type,
        address,
        delivery.type,
        "Not Verified",
        "Not Verified",
      ];
      DBQuery(sqlQuery, params, async function (err, result) {
        if (err) {
          if (err.errno == 1062) {
            console.log("userSignup", err);
            return res.send({
              emailExist: true,
            });
          }
          console.log(err);
          return;
        }
        //Create OTP and send mail to email
        const fullHash = await CreateHash(email);
        res.json({ hash: fullHash });
      });
    });
  } else return res.send({ emailExist: true });
});

//#region services_db
router.patch("/services/:id", (req, res) => {
  const m_id = req.query[0];
  const hubServices = req.body.mfgProcess;
  if (m_id && hubServices && hubServices.length > 0) {
    console.log("inside update services", hubServices, m_id);
    const sql = "DELETE FROM services WHERE Manufacturer_ID = ?";
    db.query(sql, [m_id], async (err, result) => {
      if (err) {
        return console.log("service-delete", err);
      } else {
        var serviceUpdate = false;
        await new Promise((resolve) => {
          hubServices.forEach((hubService) => {
            const serviceID = hubService.fabricationService.Service_ID;
            const materialDetails = JSON.stringify(hubService.materialDetails);
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

//#region get specific hubs from hubID from db
router.get("/service/:id/:companyname", (req, res) => {
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
        res.status(404).send("Hub Not found");
      }
    }
  );
});
//#endregion

router.post("/maker-additional-details/:id", (req, res) => {
  const upload = MultipleFileUpload("multipleImage", null);
  upload(req, res, async (err) => {
    console.log(req.body.prevImage, "details");
    let imageFile = req.files;
    const otherServices = req.body.otherServices;
    const manufacturerID = req.params.id;
    let prevImage = null;
    if (req.body.prevImage != "undefined")
      prevImage = JSON.parse(req.body.prevImage);
    let deleteImage = null;
    if (req.body.deleteImage != "undefined")
      deleteImage = JSON.parse(req.body.deleteImage);

    const sqlQuery =
      "UPDATE manufacturer SET Other_Services=?, Additional_Images = ? WHERE Manufacturer_ID = ?";
    let file = [];

    console.log(req.files, "file line 71");

    if (deleteImage.length > 0) {
      console.log(deleteImage, "delete");
      for (let i = 0; i < deleteImage.length; i++) {
        const isDelete = await FileDelete(deleteImage[i].filePath);
        console.log(isDelete, "delete true");
      }
    }

    if (req.files.length > 0) {
      console.log("inside if line 73");
      var dir = `./public/uploads/maker/${manufacturerID}/${imageFile[0].fieldname}/`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      // if (prevImage) {
      //   for (let i = 0; i < prevImage.length; i++) {
      //     FileDelete(prevImage[0].filePath);
      //   }
      // }
    } else {
      console.log("line 79");
      console.log(prevImage, "line 79");
      // imageFile = prevImage;
    }

    if (err) {
      console.log(err, "error");
    } else {
      console.log(req.files, "req");
      const files = req.files;
      for (let i = 0; i < files.length; i++) {
        let tmp_path = files[i].path;
        console.log(tmp_path, "path");
        let target_path = dir + files[i].filename;
        const filePath = await FileMove(tmp_path, target_path);
        file.push({
          fileName: files[i].filename,
          filePath: req.files.length > 0 ? filePath : files[i].filePath,
        });
      }
      let concatData = file;
      if (prevImage) concatData = [...file, ...prevImage];

      console.log(concatData, "data concat");

      console.log(file, "files");
      const data = [otherServices, JSON.stringify(concatData), manufacturerID];
      DBQuery(sqlQuery, data, (err, result) => {
        if (err) {
          return console.log(err, "update data services error");
        } else {
          console.log("success");
          res.json(result);
          return;
        }
      });
    }
  });
});

module.exports = router;

//#region get cookie - userinfo
function GenerateUid() {
  let randomId = crypto.randomBytes(16).toString("hex");
  return randomId;
}
//#endregion
