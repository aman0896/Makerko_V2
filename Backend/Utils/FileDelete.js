const fs = require("fs");
const path = require("path");

function FileDelete(filePath) {
    console.log("enter");
    try {
        let fileDelete;
        const uploadedPath = `${filePath}`;
        console.log(uploadedPath, "path");
        return new Promise((resolve) => {
            if (fs.existsSync(uploadedPath)) {
                console.log("check");
                fs.unlink(uploadedPath, (err) => {
                    try {
                        if (err) {
                            console.log(err, "err");
                            fileDelete = false;
                            resolve(fileDelete);
                            return;
                        }

                        fileDelete = true;
                        console.log("delete", fileDelete);
                        resolve(fileDelete);
                        return;
                    } catch {}
                });
            } else {
                resolve(false);
            }
        });
    } catch {
        console.log("File deletion failed");
        return false;
    }
}

function deleteFolderRecursive(directoryPath) {
    try {
        return new Promise((resolve) => {
            if (fs.existsSync(directoryPath)) {
                fs.readdirSync(directoryPath).forEach((file, index) => {
                    const curPath = path.join(directoryPath, file);
                    if (fs.lstatSync(curPath).isDirectory()) {
                        // recurse
                        deleteFolderRecursive(curPath);
                    } else {
                        // delete file
                        fs.unlink(curPath, (err) => {
                            try {
                                if (err) {
                                    console.log(err, "err");
                                    resolve(false);
                                    return;
                                }
                            } catch {}
                        });
                    }
                });
                fs.rm(directoryPath, { recursive: true }, (err) => {
                    try {
                        if (err) {
                            return console.log(err, "deleterror");
                        }
                        resolve(true);
                        return;
                    } catch {}
                });
            } else resolve(false);
        });
    } catch {}
}
module.exports = { FileDelete, deleteFolderRecursive };
