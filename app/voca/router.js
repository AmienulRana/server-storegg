const express = require("express");
const router = express.Router();

const { getProduct } = require("./controller");

router.get("/product", getProduct);
// router.post("/status/:id", actionStatus);

module.exports = router;
