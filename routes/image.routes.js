const {
  multerInstance: upload,
  cloudinary,
} = require("../config/cloudinary.config.js");
const router = require("express").Router();

router.post("/upload", upload.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No image uploaded!"));
    return;
  }
  res.json({ image: req.file });
});

router.delete("/:name", async (req, res) => {
  const { name } = req.params;
  const publicId = "flowBoard-userPics/" + name;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      res.status(204).send();
    } else {
      res.status(500).json({
        error: "Failed to delete image from Cloudinary",
        result: result,
      });
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    res.status(500).json({ error: "Failed to delete image from Cloudinary" });
  }
});

module.exports = router;
