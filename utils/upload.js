const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../public/images"),
  filename: function (req, file, cb) {
    console.log(file);
    const uniqueSuffix = Date.now() + +Math.round(Math.random() * 1e9);
    const orginalName = file.originalname.split(".");
    const originalNameNoExt = orginalName[0];
    cb(
      null,
      originalNameNoExt + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
});

module.exports = upload;
