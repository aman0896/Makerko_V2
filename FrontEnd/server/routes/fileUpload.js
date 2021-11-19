const express = require("express");
const fileUPload = require("express-fileupload");
const path = require("path");
const app = express();
var fs = require("fs");
const projectPath = path.dirname(process.cwd());
const { GetCookieDetail } = require("../Utils");
const { errorMonitor } = require("stream");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

app.use(express.json());
app.use(fileUPload());

module.exports = function (app) {
    //#region  fileUpload
    app.post("/upload", (req, res) => {
        console.log("check");
        if (req.files.file === null) {
            console.log("check");
            return res.status(400).json({ msg: "No file uploaded" });
        }
        console.log("appendData", req.files);
        var file = req.files.file;
        var path = req.body.path;
        var feature = req.body.feature;
        const oldFileName = file.name;
        const splitFileName = file.name.split(".");
        const shortFileName = splitFileName[0].split(" ");
        const currentDate = new Date().getTime();

        //#region create new folder directory
        const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);

        var Path = `${projectPath}/public/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}`;

        try {
            fs.mkdirSync(Path, { recursive: true });
        } catch (err) {
            console.log("error", err);
        }

        fs.mkdir(Path, (err) => {
            if (
                path != "models" &&
                feature != "feature" &&
                path != "requestdesign/image" &&
                path != "requestdesign/sketch"
            ) {
                var newFileName = path + "." + "jpg";
                var uploadPath = `${Path}/${newFileName}`;
            } else {
                if (feature === "feature") {
                    var newFileName = shortFileName[0] + "." + splitFileName[1];
                    var uploadPath = `${Path}/${newFileName}`;
                } else {
                    var newFileName = file.name;
                    var uploadPath = `${Path}/${newFileName}`;
                }
            }

            fs.mkdir(Path, (err) => {
                if (
                    path != "models" &&
                    feature != "feature" &&
                    path != "requestdesign/image" &&
                    path != "requestdesign/sketch"
                ) {
                    fs.readdir(Path, (err, files) => {
                        if (err) throw err;
                        const path = require("path");
                        for (const file of files) {
                            fs.unlink(path.join(Path, file), (err) => {
                                if (err) throw err;
                            });
                        }
                    });
                    var newFileName =
                        shortFileName[0] + currentDate + "." + splitFileName[1];
                    var uploadPath = `${Path}/${newFileName}`;
                } else {
                    if (feature === "feature") {
                        var newFileName =
                            shortFileName[0] +
                            currentDate +
                            "." +
                            splitFileName[1];
                        var uploadPath = `${Path}/${newFileName}`;
                    } else {
                        var newFileName = file.name;
                        var uploadPath = `${Path}/${newFileName}`;
                    }
                }

                // if (err) {
                //     if (err.code === "EEXIST") {
                //         // console.log(previousPath, 'uploaded');
                //         if (file != null) {
                //             if (!fs.existsSync(uploadPath)) {
                //                 file.mv(uploadPath, (err) => {
                //                     if (err) {
                //                         console.error(err, "-----");
                //                         return res.status(500).send(err);
                //                     }
                //                     res.json({
                //                         fileName: newFileName,
                //                         filePath: `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`,
                //                         oldFileName: oldFileName,
                //                     });
                //                 });
                //             } else
                //                 fs.unlink(uploadPath, (err) => {
                //                     if (err)
                //                         return res.send({
                //                             msg: "fileNotDeleted",
                //                             removed: false,
                //                         });
                //                     file.mv(uploadPath, (err) => {
                //                         if (err) {
                //                             console.error(err);
                //                             return res.status(500).send(err);
                //                         }
                //                         res.json({
                //                             fileName: newFileName,
                //                             filePath: `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`,
                //                             oldFileName: oldFileName,
                //                         });
                //                     });
                //                 });
                //         }
                //     }
                // } else {
                if (file != null) {
                    console.log("etfd");

                    file.mv(uploadPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                        res.json({
                            fileName: newFileName,
                            filePath: `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`,
                            oldFileName: oldFileName,
                        });
                    });
                }
                // }
            });
            //#endregion
        });
        //#endregion
    });
    //#endregion

    //#region Project upload

    app.post("/projectUpload", (req, res) => {
        console.log("check");
        if (req.files.file === null) {
            console.log("check");
            return res.status(400).json({ msg: "No file uploaded" });
        }
        console.log("appendData", req.files.file, req.body.name);
        var file = req.files.file;
        var path = req.body.path;
        var feature = req.body.feature;
        const oldFileName = req.body.name;
        const splitFileName = req.body.name.split(".");
        const shortFileName = splitFileName[0].split(" ");
        const currentDate = new Date().getTime();

        //#region create new folder directory
        const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);

        var Path = `${projectPath}/public/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}`;
        console.log("path", Path);

        try {
            fs.mkdirSync(Path, { recursive: true });
        } catch (err) {
            console.log("error", err);
        }

        fs.mkdir(Path, (err) => {
            if (path != "models" && feature != "feature") {
                var newFileName = path + "." + "jpg";
                var uploadPath = `${Path}/${newFileName}`;
            } else {
                if (feature === "feature") {
                    var newFileName = shortFileName[0] + "." + splitFileName[1];
                    var uploadPath = `${Path}/${newFileName}`;
                } else {
                    var newFileName = file.name;
                    var uploadPath = `${Path}/${newFileName}`;
                }
            }

            if (err) {
                if (err.code === "EEXIST") {
                    // console.log(previousPath, 'uploaded');
                    if (file != null) {
                        if (!fs.existsSync(uploadPath)) {
                            file.mv(uploadPath, (err) => {
                                if (err) {
                                    console.error(err, "-----");
                                    return res.status(500).send(err);
                                }
                                res.json({
                                    fileName: newFileName,
                                    filePath: `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`,
                                    oldFileName: oldFileName,
                                });
                            });
                        } else
                            fs.unlink(uploadPath, (err) => {
                                if (err)
                                    return res.send({
                                        msg: "fileNotDeleted",
                                        removed: false,
                                    });
                                file.mv(uploadPath, (err) => {
                                    if (err) {
                                        console.error(err);
                                        return res.status(500).send(err);
                                    }
                                    res.json({
                                        fileName: newFileName,
                                        filePath: `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`,
                                        oldFileName: oldFileName,
                                    });
                                });
                            });
                    }
                }
            } else {
                if (file != null) {
                    s;
                    file.mv(uploadPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                        res.json({
                            fileName: newFileName,
                            filePath: `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`,
                            oldFileName: oldFileName,
                        });
                    });
                }
            }
        });
        //#endregion
    });
    //#endregion

    //#region delete uploadedfile
    app.post("/delete", (req, res) => {
        const filePath = req.body.filePath;
        console.log(filePath);
        const uploadedPath = `${projectPath}/public/${filePath}`;
        if (fs.existsSync(uploadedPath)) {
            fs.unlink(uploadedPath, (err) => {
                if (err)
                    return res.send({ msg: "fileNotDeleted", removed: false });
                res.send({
                    msg: "File Removed Successfully!!!",
                    removed: true,
                });
            });
        }
    });
    //#endregion
    //#region delete multiple uploadedfile
    app.post("/deleteMultiple", (req, res) => {
        const filePaths = req.body.filePath;
        console.log(filePaths, "filepaths");
        filePaths.forEach((filePath) => {
            const uploadedPath = `${projectPath}/public/${filePath}`;
            console.log(uploadedPath, "uploadedpath");
            if (fs.existsSync(uploadedPath)) {
                fs.unlink(uploadedPath, (err) => {
                    // if (err) return res.send({ msg: "fileNotDeleted", removed: false });
                    //   res.send({
                    //     msg: "File Removed Successfully!!!",
                    //     removed: true,
                    //   });
                });
            }
        });
    });
    //#endregion

    //#region multiple uploadedfile
    app.post("/multipleupload", (req, res) => {
        console.log("multiplecheck");
        if (req.files.file === null) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const files = req.files.file;
        var path = req.body.path;
        let uploadedFiles = [];

        const currentUser = GetCookieDetail(req.cookies.uid, JWT_AUTH_TOKEN);

        var Path = `${projectPath}/public/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}`;

        try {
            fs.mkdirSync(Path, { recursive: true });
        } catch (err) {
            console.log("error", err);
        }

        if (files != null && files.length > 0) {
            files.forEach((file) => {
                const oldFileName = file.name;
                const splitFileName = oldFileName.split(".");
                const shortFileName = splitFileName[0].split(" ");
                const currentDate = new Date().getTime();
                var newFileName =
                    shortFileName[0] + currentDate + "." + splitFileName[1];
                var uploadPath = `${Path}/${newFileName}`;
                var filePath = `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`;
                if (!fs.existsSync(uploadPath)) {
                    file.mv(uploadPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                    });
                    uploadedFiles = uploadedFiles.concat({
                        fileName: file.name,
                        filePath: filePath,
                    });
                } else {
                    fs.unlink(uploadPath, (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });

                    file.mv(uploadPath, (err) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).send(err);
                        }
                    });

                    uploadedFiles = uploadedFiles.concat({
                        fileName: file.name,
                        filePath: filePath,
                    });
                }
            });
            console.log("file", uploadedFiles);
            res.send(uploadedFiles);
        } else {
            console.log("singlecheck");
            var newFileName = files.name;
            var uploadPath = `${Path}/${newFileName}`;
            var filePath = `/uploads/${currentUser.userStatus}/${currentUser.uid}/${path}/${newFileName}`;
            if (!fs.existsSync(uploadPath)) {
                files.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                });
                uploadedFiles = {
                    fileName: files.name,
                    filePath: filePath,
                };
            } else {
                fs.unlink(uploadPath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });

                files.mv(uploadPath, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send(err);
                    }
                });

                uploadedFiles = {
                    fileName: files.name,
                    filePath: filePath,
                };
            }
            console.log("file", uploadedFiles);
            res.send(uploadedFiles);
        }
    });
    //#endregion
};
