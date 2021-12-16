const fs = require("fs");

function FileDelete(filePath) {
    try {
        let fileDelete;
        const uploadedPath = `${filePath}`;
        return new Promise((resolve) => {
            if (fs.existsSync(uploadedPath)) {
                fs.unlink(uploadedPath, (err) => {
                    if (err) {
                        fileDelete = false;
                        resolve(fileDelete);
                        return;
                    }

                    fileDelete = true;
                    resolve(fileDelete);
                    return;
                });
            }
        });
    } catch {
        console.log("File deletion failed");
        return false;
    }
}

module.exports = FileDelete;
