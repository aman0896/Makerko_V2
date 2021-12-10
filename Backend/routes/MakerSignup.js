const express = require("express");
const crypto = require("crypto");
const { GetAllUsersData } = require("../DBController/DBController");
const { PasswordEncryption } = require("../Utils/passwordSecurity");
const { DBQuery } = require("../DBController/DatabaseQuery");
const { CreateHash } = require("../Utils/OTP");
const router = express.Router();
const db = require("../DBController/DBConnect");

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
  console.log("inside update services");

  const m_id = req.query[0];
  const hubServices = req.body.mfgProcess;
  if (m_id && hubServices && hubServices.length > 0) {
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

module.exports = router;

//#region get cookie - userinfo
function GenerateUid() {
  let randomId = crypto.randomBytes(16).toString("hex");
  return randomId;
}
//#endregion
