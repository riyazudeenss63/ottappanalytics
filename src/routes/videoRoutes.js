const express = require("express");
const router = express.Router();

const {
  getAllVideos,
  createVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  addView,
  addWatchTime
} = require("../controllers/videoController");

router.get("/", getAllVideos);
router.post("/", createVideo);
router.get("/:id", getVideoById);
router.put("/:id", updateVideo);
router.delete("/:id", deleteVideo);
router.post("/:id/view", addView);
router.post("/:id/watch", addWatchTime);

module.exports = router;