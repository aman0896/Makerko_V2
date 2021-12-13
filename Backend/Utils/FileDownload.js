//project path define
const path = require("path");
const projectPath = path.dirname(process.cwd());
var fs = require("fs");

// Start download any File or images
function FileDownload(filePath) {
  const filedir = `${filePath}`;
  return new Promise((resolve) => {
    if (filedir) {
      const file = filedir;
      fs.access(file, fs.F_OK, (err) => {
        if (err) {
          console.log(
            "no Such File or Directory",
            "File Download line 14",
            err
          );
        } else {
          // Set disposition and send it.
          resolve(file);
        }
      });
    } else {
      console.log("incorrect file url", "fileDownload line 21");
    }
  });
}
// End download any File or images
module.exports = FileDownload;
