const express = require("express");
const router = express.Router();
const { authenticationToken } = require("../middleware/loginUser");
const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  historyDetail,
  dashboard,
  profile,
} = require("./controller");

router.get("/", landingPage);
router.get("/detail/:id", detailPage);
router.get("/category", category);
router.post("/checkout", authenticationToken, checkout);
router.get("/history", authenticationToken, history);
router.get("/history/:id/detail", authenticationToken, historyDetail);
router.get("/dashboard", authenticationToken, dashboard);
router.get("/profile", authenticationToken, profile);

module.exports = router;
