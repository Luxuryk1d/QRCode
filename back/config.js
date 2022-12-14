const path = require("path");

const rootPath = __dirname;

module.exports = {
  rootPath,
  uploadPath: path.join(rootPath, "public/uploads"),
  db: {
    name: "offices",
    url: "mongodb://localhost",
  },
};