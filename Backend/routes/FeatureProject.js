const express = require("express");
const { DBQuery2, DBQuery } = require("../DBController/DatabaseQuery");
const {
    MultipleFieldUpload,
    MultipleFileUpload,
    SingleFileUpload,
} = require("../Utils/MultarFileUpload");
const router = express.Router();
var fs = require("fs");
const { FileMove } = require("../Utils/Operations");
const { FileDelete, deleteFolderRecursive } = require("../Utils/FileDelete");

router.post("/create", (req, res) => {
    try {
        const fields = [
            { name: "coverImage", maxCount: 1 },
            { name: "pdfFile", maxCount: 1 },
            { name: "contentImage" },
            { name: "gallery" },
        ];
        const upload = MultipleFieldUpload(fields);
        upload(req, res, async (err) => {
            try {
                if (err) return console.log(err, "FeatureProject line 13");
                const contents = JSON.parse(req.body.contents);
                const content_images = req.files.contentImage;
                const coverImage = req.files.coverImage[0];
                const pdfFile = req.files.pdfFile[0];
                const gallery = req.files.gallery;
                const restDetails = JSON.parse(req.body.restDetails);
                const author = JSON.parse(req.body.author);

                //#region author id
                if (Object.keys(author).includes("Customer_ID")) {
                    var authorId = author.Customer_ID;
                    var authorType = "customer";
                } else {
                    authorId = author.Manufacturer_ID;
                    authorType = "maker";
                }
                const projectId = `${authorId}` + `${randomID()}`;
                //#endregion

                //#region cover images
                if (coverImage) {
                    if (Object.keys(author).includes("Customer_ID")) {
                        var coverImagedir = `./public/uploads/customer/${author.Customer_ID}/feature_project/${projectId}/`;
                        if (!fs.existsSync(coverImagedir)) {
                            fs.mkdirSync(coverImagedir, { recursive: true });
                        }
                        // if (prevImage && prevImage.filePath) {
                        //     FileDelete(prevImage.filePath);
                        // }
                    } else {
                        var coverImagedir = `./public/uploads/maker/${author.Manufacturer_ID}/feature_project/${projectId}/`;
                        if (!fs.existsSync(coverImagedir)) {
                            fs.mkdirSync(coverImagedir, { recursive: true });
                        }
                        // if (prevImage && prevImage.filePath) {
                        //     FileDelete(prevImage.filePath);
                        // }
                    }
                } else {
                    // console.log("line 46");
                    // console.log(prevImage, "line 47");
                    // imageFile = prevImage;
                }

                //coverimage path
                let coverImage_tmp_path = coverImage.path;
                let coverImage_target_path =
                    coverImagedir + coverImage.filename;
                const coverImagePath = await FileMove(
                    coverImage_tmp_path,
                    coverImage_target_path
                );
                //#endregion

                //#region pdfFile
                if (pdfFile) {
                    if (Object.keys(author).includes("Customer_ID")) {
                        var pdfFiledir = `./public/uploads/customer/${author.Customer_ID}/feature_project/${projectId}/`;
                        if (!fs.existsSync(pdfFiledir)) {
                            fs.mkdirSync(pdfFiledir, { recursive: true });
                        }
                        // if (prevImage && prevImage.filePath) {
                        //     FileDelete(prevImage.filePath);
                        // }
                    } else {
                        var pdfFiledir = `./public/uploads/maker/${author.Manufacturer_ID}/feature_project/${projectId}/`;
                        if (!fs.existsSync(pdfFiledir)) {
                            fs.mkdirSync(pdfFiledir, { recursive: true });
                        }
                        // if (prevImage && prevImage.filePath) {
                        //     FileDelete(prevImage.filePath);
                        // }
                    }
                } else {
                    // console.log("line 46");
                    // console.log(prevImage, "line 47");
                    // imageFile = prevImage;
                }

                //pdfFile path
                let pdfFile_tmp_path = pdfFile.path;
                let pdfFile_target_path = pdfFiledir + pdfFile.filename;
                const pdfFilePath = await FileMove(
                    pdfFile_tmp_path,
                    pdfFile_target_path
                );
                //#endregion

                //#region content images
                if (content_images) {
                    if (Object.keys(author).includes("Customer_ID")) {
                        var dir = `./public/uploads/customer/${author.Customer_ID}/feature_project/${projectId}/${content_images[0].fieldname}/`;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                        // if (prevImage && prevImage.filePath) {
                        //     FileDelete(prevImage.filePath);
                        // }
                    } else {
                        var dir = `./public/uploads/maker/${author.Manufacturer_ID}/feature_project/${projectId}/${content_images[0].fieldname}/`;
                        if (!fs.existsSync(dir)) {
                            fs.mkdirSync(dir, { recursive: true });
                        }
                        // if (prevImage && prevImage.filePath) {
                        //     FileDelete(prevImage.filePath);
                        // }
                    }
                } else {
                    // console.log("line 46");
                    // console.log(prevImage, "line 47");
                    // imageFile = prevImage;
                }
                for (let i = 0; i < content_images.length; i++) {
                    let tmp_path = content_images[i].path;
                    let target_path = dir + content_images[i].filename;
                    const filePath = await FileMove(tmp_path, target_path);
                    console.log(filePath, "filepath");
                    contents[i].content_image = {
                        filename: content_images[i].filename,
                        filePath: filePath,
                    };
                    // file.push({
                    //     fileName: files[i].filename,
                    //     filePath:
                    //         req.files.length > 0 ? filePath : files[i].filePath,
                    // });
                }
                //#endregion

                console.log(gallery, "gallery");
                //#region gallery image
                if (gallery.length > 0) {
                    console.log("inside if line 73");
                    var gallery_dir = `./public/uploads/${authorType}/${authorId}/feature_project/${projectId}/${gallery[0].fieldname}/`;
                    if (!fs.existsSync(gallery_dir)) {
                        fs.mkdirSync(gallery_dir, { recursive: true });
                    }
                    // if (prevImage) {
                    //   for (let i = 0; i < prevImage.length; i++) {
                    //     FileDelete(prevImage[0].filePath);
                    //   }
                    // }
                } else {
                    // console.log("line 79");
                    // console.log(prevImage, "line 79");
                    // imageFile = prevImage;
                }
                let newGallery = [];
                for (let i = 0; i < gallery.length; i++) {
                    let gallery_tmp_path = gallery[i].path;
                    console.log(gallery_tmp_path, "path");
                    let gallery_target_path = gallery_dir + gallery[i].filename;
                    const gallery_filePath = await FileMove(
                        gallery_tmp_path,
                        gallery_target_path
                    );
                    newGallery.push({
                        fileName: gallery[i].filename,
                        filePath:
                            gallery.length > 0
                                ? gallery_filePath
                                : gallery[i].filePath,
                    });
                }

                let overallGallery = newGallery;
                // if (prevImage) overallGallery = [...overallGallery, ...prevImage];
                //#endregion

                //#region data  storing in db
                const sqlQuery =
                    "INSERT INTO project(Project_ID, Author_ID, Publish_Date, Manufacturing_Process, Materials, Title, Cover_Image, Description, PdfDocument, Gallary, Content, Category) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)";
                const {
                    materials,
                    projectTitle,
                    description,
                    category,
                    manufacturingProcess,
                } = restDetails;

                const data = [
                    projectId,
                    authorId,
                    Date.now(),
                    manufacturingProcess,
                    materials,
                    projectTitle,
                    JSON.stringify({
                        filename: coverImage.filename,
                        filePath: coverImagePath,
                    }),
                    description,
                    JSON.stringify({
                        filename: pdfFile.filename,
                        filePath: pdfFilePath,
                    }),
                    JSON.stringify(overallGallery),
                    JSON.stringify(contents),
                    category,
                ];
                DBQuery(sqlQuery, data, (err, result) => {
                    try {
                        if (err)
                            return console.log(
                                err,
                                "featureproject create line 160"
                            );
                        res.json({ create: "success" });
                        console.log(result, "featureproject create line 162");
                    } catch {}
                });
                //#endregion
            } catch {}
        });
    } catch (err) {
        console.log(err);
    }
});

//get all feature_project from db
// router.get("/get-featureproject-list", async (req, res) => {
//     const sqlQuery = "SELECT * FROM feature_project";
//     const data = await DBQuery2(sqlQuery);
//     console.log(data, "data");
//     res.json(data);
// });

//get all feature_project from db
router.get("/get-featureproject-list", async (req, res) => {
    try {
        const sqlQuery = "SELECT * FROM project";
        const data = await DBQuery2(sqlQuery);
        console.log(JSON.parse(data[0].Content)[0], "data");
        res.json(data);
    } catch {}
});

//delete project
router.delete("/delete-project", async (req, res) => {
    try {
        const params = JSON.parse(req.query.path);
        const { authorId, projectId } = params;
        console.log(params.projectId, "query");
        const sqlQuery = "DELETE FROM project WHERE Project_ID = ?";
        const data = [projectId];

        const customerProjectPath = `./public/uploads/customer/${authorId}/feature_project/${projectId}`;
        const makerProjectPath = `./public/uploads/maker/${authorId}/feature_project/${projectId}`;
        const isCustomerProjectDelete = await deleteFolderRecursive(
            customerProjectPath
        );
        const isMakerProjectDelete = await deleteFolderRecursive(
            makerProjectPath
        );
        console.log(isCustomerProjectDelete, isMakerProjectDelete, "delete");
        if (isCustomerProjectDelete) {
            DBQuery(sqlQuery, data, (err, result) => {
                if (err) return res.json({ delete: "false" });
                return res.json({ delete: "success" });
            });
        } else if (isMakerProjectDelete) {
            DBQuery(sqlQuery, data, (err, result) => {
                if (err) return res.json({ delete: "false" });
                return res.json({ delete: "success" });
            });
        } else {
            res.json({ delete: "false" });
        }
    } catch {}
});

//content Edit
router.post("/content-edit", async (req, res) => {
    try {
        const upload = MultipleFileUpload("contentImage");

        upload(req, res, async (err) => {
            try {
                if (err) return console.log(err, "edit-content-project");
                const contents = JSON.parse(req.body.content);
                const contentImage = req.files;
                const projectId = req.body.projectId;
                const authorId = req.body.authorId;
                console.log(contents, contentImage, projectId, authorId);

                //#region content images
                if (contentImage.length > 0) {
                    const customerDir = `./public/uploads/customer/${authorId}/feature_project/${projectId}/`;
                    // const makerDir = `./public/uploads/maker/${authorId}/feature_project/${projectId}/`;
                    if (fs.existsSync(customerDir)) {
                        var dir = `./public/uploads/customer/${authorId}/feature_project/${projectId}/${contentImage[0].fieldname}/`;
                        fs.mkdirSync(dir, { recursive: true });
                    } else {
                        var dir = `./public/uploads/maker/${authorId}/feature_project/${projectId}/${contentImage[0].fieldname}/`;
                        fs.mkdirSync(dir, { recursive: true });
                    }
                } else {
                    // console.log("line 46");
                    // console.log(prevImage, "line 47");
                    // imageFile = prevImage;
                }
                for (let j = 0; j < contents.length; j++) {
                    if (Object.keys(contents[j].content_image).length === 0) {
                        for (let i = 0; i < contentImage.length; i++) {
                            let tmp_path = contentImage[i].path;
                            let target_path = dir + contentImage[i].filename;
                            const filePath = await FileMove(
                                tmp_path,
                                target_path
                            );
                            contents[j].content_image = {
                                filename: contentImage[i].filename,
                                filePath: filePath,
                            };

                            // file.push({
                            //     fileName: files[i].filename,
                            //     filePath:
                            //         req.files.length > 0 ? filePath : files[i].filePath,
                            // });
                        }
                    } else {
                        delete contents[j].content_image.url;
                    }
                }
                console.log(contents, "contents");
                const sqlQuery =
                    "UPDATE project SET Content = ? WHERE Project_ID = ?";
                data = [JSON.stringify(contents), projectId];
                DBQuery(sqlQuery, data, (err, result) => {
                    if (err)
                        return console.log(
                            err,
                            "featureproject create line 160"
                        );
                    res.json({ contentEdit: "success" });
                });
                //#endregion
            } catch {}
        });
    } catch {}
});

//cover image edit
router.post("/cover-edit", (req, res) => {
    try {
        const upload = SingleFileUpload("coverImage");

        upload(req, res, async (err) => {
            try {
                const coverImage = req.file;
                const authorId = req.body.authorId;
                const projectId = req.body.projectId;
                const prevImage = req.body.prevImage;
                //#region cover images
                if (coverImage) {
                    const customerDir = `./public/uploads/customer/${authorId}/feature_project/${projectId}/`;
                    // const makerDir = `./public/uploads/maker/${authorId}/feature_project/${projectId}/`;
                    if (fs.existsSync(customerDir)) {
                        var coverImageDir = `./public/uploads/customer/${authorId}/feature_project/${projectId}/`;
                    } else {
                        var coverImageDir = `./public/uploads/maker/${authorId}/feature_project/${projectId}/`;
                    }
                }

                //coverimage path
                let coverImage_tmp_path = coverImage.path;
                let coverImage_target_path =
                    coverImageDir + coverImage.filename;
                const coverImagePath = await FileMove(
                    coverImage_tmp_path,
                    coverImage_target_path
                );
                console.log(coverImagePath, "filepath");

                const sqlQuery =
                    "UPDATE project SET Cover_Image = ? WHERE Project_ID = ?";

                data = [
                    JSON.stringify({
                        filename: coverImage.filename,
                        filePath: coverImagePath,
                    }),
                    projectId,
                ];
                DBQuery(sqlQuery, data, (err, result) => {
                    if (err)
                        return console.log(
                            err,
                            "featureproject create line 160"
                        );
                    FileDelete(prevImage);
                    res.json({ coverImageUpdate: "success" });
                });

                //#endregion
            } catch {}
        });
    } catch {}
});

//project title ,manufacturing, material, category & description edit
router.post("/detail-edit", (req, res) => {
    try {
        const projectTitle = req.body.projectTitle;
        const manufacturingProcess = req.body.manufacturingProcess;
        const materials = req.body.materials;
        const category = req.body.category;
        const description = req.body.description;
        const projectId = req.body.projectId;

        const sqlQuery =
            "UPDATE project SET Title = ?, Manufacturing_Process = ?, Materials=?, Description = ?, Category=? WHERE Project_ID = ?";

        data = [
            projectTitle,
            manufacturingProcess,
            materials,
            description,
            category,
            projectId,
        ];

        DBQuery(sqlQuery, data, (err, result) => {
            if (err) return console.log(err, "projectDetail updtate fail");
            res.json({ detailUpdate: "success" });
        });
    } catch {}
});

//gallery new image add
router.post("/gallery-image", async (req, res) => {
    try {
        const upload = MultipleFileUpload("gallery");
        upload(req, res, async (err) => {
            try {
                if (err)
                    return console.log(
                        err,
                        "from Gallery Image new Upload featureProject.js line 404"
                    );

                const galleryImages = req.files;
                if (req.files) {
                    res.json({ galleryImages: req.files });
                }
                console.log(galleryImages, "images Gallery");
            } catch {}
        });
    } catch {}
});

//update gallery
router.post("/update-gallery", async (req, res) => {
    try {
        const deletedGalleryImage = req.body.deletedGalleryImage;
        const galleryImage = req.body.galleryImage;
        const authorId = req.body.authorId;
        const projectId = req.body.projectId;

        if (deletedGalleryImage.length > 0) {
            console.log("delete image");
            for (let i = 0; i < deletedGalleryImage.length; i++) {
                console.log(deletedGalleryImage[i].filePath, "delete path");
                const isDelete = await FileDelete(
                    deletedGalleryImage[i].filePath
                );
                console.log(isDelete, "delete");
            }
        }

        if (galleryImage) {
            if (galleryImage.length > 0) {
                const customerDir = `./public/uploads/customer/${authorId}/feature_project/${projectId}/`;
                if (fs.existsSync(customerDir)) {
                    var dir = `./public/uploads/customer/${authorId}/feature_project/${projectId}/gallery/`;
                    fs.mkdirSync(dir, { recursive: true });
                } else {
                    var dir = `./public/uploads/maker/${authorId}/feature_project/${projectId}/gallery/`;
                    fs.mkdirSync(dir, { recursive: true });
                }
            }

            for (let i = 0; i < galleryImage.length; i++) {
                if (galleryImage[i].newUpload === true) {
                    if (fs.existsSync(galleryImage[i].filePath)) {
                        let gallery_tmp_path = galleryImage[i].filePath;
                        let gallery_target_path =
                            dir + galleryImage[i].fileName;
                        const imagePath = await FileMove(
                            gallery_tmp_path,
                            gallery_target_path
                        );
                        galleryImage[i] = {
                            fileName: galleryImage[i].fileName,
                            filePath: imagePath,
                        };
                    }
                } else {
                    console.log("path exist");
                    delete galleryImage[i].url;
                }
            }
            const sqlQuery =
                "UPDATE project SET Gallary = ? WHERE Project_ID = ?";
            const data = [JSON.stringify(galleryImage), projectId];
            DBQuery(sqlQuery, data, (err, result) => {
                if (err)
                    return console.log(err, "err featureproject.js line 472");
                console.log(result, "gallery update");
                res.json({ galleryUpdate: "success" });
            });
        }
    } catch {}
});

module.exports = router;

const randomID = () => {
    var id = Math.random();
    id = Math.floor(100000 + id * 900000);
    return id;
};
