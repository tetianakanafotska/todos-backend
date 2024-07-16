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

router.get("/:publicId", async (req, res) => {
  const { publicId } = req.params;

  try {
    const result = await cloudinary.api.resource(publicId);
    res.json({ imageUrl: result.url });
  } catch (error) {
    console.error("Error fetching Cloudinary resource:", error);
    res.status(500).json({ error: "Failed to fetch image from Cloudinary" });
  }
});

router.get("/resize/:publicId", (req, res) => {
  const { publicId } = req.params;
  const width = req.query.width || 500;
  const height = req.query.height || 500;

  const imageUrl = cloudinary.url(publicId, {
    width: width,
    height: height,
    crop: "fit",
  });
  res.send({ imageUrl });
});

module.exports = router;
