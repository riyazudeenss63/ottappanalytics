const express = require("express");
const router = express.Router();

const {
  getTotalViews,
  getTotalWatchTime,
  getTopVideo,
  getVideoAnalytics
} = require("../controllers/analyticsController");

router.get("/views", getTotalViews);
router.get("/watchtime", getTotalWatchTime);
router.get("/top-video", getTopVideo);
router.get("/videos", getVideoAnalytics);

module.exports = router;