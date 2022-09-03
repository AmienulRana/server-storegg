const express = require("express");
const router = express.Router();

const { signup, signin } = require("./controller");

router.post("/signup", signup);
router.post("/signin", signin);

// router.get("/detail/:id", detailPage);
// router.post("/status/:id", actionStatus);

module.exports = router;
