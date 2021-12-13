const fs = require("fs");

function FileDelete(filePath) {
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
}

module.exports = FileDelete;
