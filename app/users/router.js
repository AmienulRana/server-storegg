const express = require("express");
const router = express.Router();

const { index, actionSignIn, handleLogout } = require("./controller");
/* GET users listing. */
router.get("/", index);
router.post("/login", actionSignIn);
router.get("/logout", handleLogout);

module.exports = router;
