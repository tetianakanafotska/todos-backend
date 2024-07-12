const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  secure: true,
  cloudinary_url: process.env.CLOUDINARY_URL,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "flowBoard-userPics",
    allowed_formats: ["jpg", "png", "webm", "jpeg"],
    public_id: (req, file) => `${file.originalname}`,
  },
});

module.exports = multer({ storage });
