const express = require("express");
const app = express();
const server = require("http").createServer(app);
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
require("dotenv").config();
var multer = require("multer");
var fs = require("fs");
const Makers = require("./routes/Makers");
const { DBQuery } = require("./DBController/DatabaseQuery");
const fse = require("fs-extra");
const { SingleFileUpload } = require("./Utils/MultarFileUpload");
//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());

//db initialization
const db = require("./DBController/DBConnect");

//server ip
// var ipAddress = "172.31.32.139";
// var hostAddress = "https://makerko.com";

// var ipAddress = "192.168.10.67";
// var hostAddress = "http://192.168.10.67:3000";

// var ipAddress = "192.168.1.103";
// var hostAddress = "http://192.168.1.103:5000";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, OPTIONS,PATCH"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());

//#region init routes
const login = require("./routes/login");
app.use("/account", login);

const signup = require("./routes/Signup");
app.use("/account", signup);

const otpVerification = require("./routes/OTPVerification");
app.use("/account", otpVerification);

const user = require("./routes/User");
app.use("/account", user);

const makerSignup = require("./routes/MakerSignup");
app.use("/account", makerSignup);

const FeatureProject = require("./routes/FeatureProject");
app.use("/project", FeatureProject);

const Profile = require("./routes/Profile");
app.use("/profile", Profile);

const DropZone = require("./routes/DropZone");
app.use("/dropzone", DropZone);

const Process = require("./routes/Process");
app.use("/process", Process);

const Quote = require("./routes/Quote");
const FileDownload = require("./Utils/FileDownload");
app.use("/quote", Quote);

app.use("/makers", Makers);

const Order = require("./routes/Order");
app.use("/order", Order);

const DesignRequest = require("./routes/DesignRequest");
app.use("/requestDesign", DesignRequest);

const ForgotPassword = require("./routes/ForgotPassword");
const { FileMove } = require("./Utils/Operations");
app.use("/reset", ForgotPassword);
//#endregion

//Serve the static files from the React app
app.use(
  "/counselling/triage/",
  express.static(path.join(projectPath, "build"))
);

//Handle any request that don't match the ones above
const root = path.join(projectPath, "build");

// app.get('*', (req, res) => {
//     res.sendFile('index.html', { root });
// });

// Start download any File or images
app.post("/download", async function (req, res) {
  const path = req.body.filedir;
  const filedir = `${path}`;
  const file = await FileDownload(filedir);
  if (file) {
    res.download(file); // Set disposition and send it.
    return;
  }
});
// End download any File or images

//invalid

app.post("/invalidaction", (req, res) => {
  const upload = SingleFileUpload("file", null);
  upload(req, res, async (err) => {
    if (err) {
      console.log(err, "error");
    } else {
      console.log(req.body, "body");
      console.log(req.file, "file");

      var uploadfile = req.file;
      const data = JSON.parse(req.body.data);
      const order = parseInt(data.order);
      const validation = data.validation;
      const suggestion = data.suggestion;
      const review = data.review;
      const email = data.email;
      fse.move(
        `./public/temp/${uploadfile.filename}`,
        `./public/uploadfile/${uploadfile.filename}`,
        (err) => {
          if (err) return console.error(err);
          console.log("success!");
        }
      );
      const sqlQuery =
        "INSERT INTO form (OrderId, Validation,SuggestedAction,Reference,Review, Email) VALUES (?,?,?,?,?,?)";
      const value = [
        order,
        validation,
        suggestion,
        JSON.stringify({
          filename: uploadfile.filename,
          filepath: `./public/uploadfile/${uploadfile.filename}`,
        }),
        review,
        email,
      ];

      DBQuery(sqlQuery, value, async (err, result) => {
        if (err) {
          console.log(err, "insert error");
          return;
        } else {
          console.log("result", result);
        }
      });
    }
  });
});
app.get("/showdata", (req, res) => {
  const sqlQuery = "SELECT * FROM form";

  DBQuery(sqlQuery, async (err, result) => {
    if (err) {
      console.log(err, "insert error");
      return;
    } else {
      res.send(result);
      console.log("result", result);
    }
  });
});
server.listen(3001, () => {
  console.log("running server");
});
