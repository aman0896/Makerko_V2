const express = require("express");
const { DBQuery2, DBQuery } = require("../DBController/DatabaseQuery");
const { MultipleFieldUpload } = require("../Utils/MultarFileUpload");
const router = express.Router();
var fs = require("fs");
const { FileMove } = require("../Utils/Operations");

router.post("/create", (req, res) => {
    const fields = [
        { name: "coverImage", maxCount: 1 },
        { name: "pdfFile", maxCount: 1 },
        { name: "contentImage" },
        { name: "gallery" },
    ];
    try {
        const upload = MultipleFieldUpload(fields);
        upload(req, res, async (err) => {
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
            let coverImage_target_path = coverImagedir + coverImage.filename;
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
                "INSERT INTO project(Project_ID, Author_ID, Publish_Date, Production_Details, Title, Cover_Image, Description, PdfDocument, Gallary, Content) VALUES(?,?,?,?,?,?,?,?,?,?)";
            const { productionDetails, projectTitle, description } =
                restDetails;

            const data = [
                projectId,
                authorId,
                Date.now(),
                productionDetails,
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
            ];
            DBQuery(sqlQuery, data, (err, result) => {
                if (err)
                    return console.log(err, "featureproject create line 160");
                console.log(result, "featureproject create line 162");
            });
            //#endregion
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
    const sqlQuery = "SELECT * FROM project";
    const data = await DBQuery2(sqlQuery);
    console.log(JSON.parse(data[0].Content)[0], "data");
    res.json(data);
});
module.exports = router;

const randomID = () => {
    var id = Math.random();
    id = Math.floor(100000 + id * 900000);
    return id;
};
