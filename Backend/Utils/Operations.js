const fs = require("fs");

function FileMove(tmp_path, target_path) {
    return new Promise((resolve) => {
        try {
            if (tmp_path && target_path) {
                /** A better way to copy the uploaded file. **/
                let src = fs.createReadStream(tmp_path);
                let dest = fs.createWriteStream(target_path);
                src.pipe(dest);
                src.on("end", function () {
                    console.log("complete");
                    resolve(target_path);
                });
                src.on("error", function (err) {
                    console.log("error");
                });
                src.on("close", function (err) {
                    fs.unlink(tmp_path, function (err) {
                        console.log(err);
                    });
                });
                return;
            } else {
                resolve("empty file directory");
                return;
            }
        } catch (err) {
            console.log(err, "filemove");
        }
    });
}

module.exports = { FileMove };
