const upload = require("../config/cloudinary.config.js");
const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No image uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
});

module.exports = router;
