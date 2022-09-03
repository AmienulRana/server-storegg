const express = require("express");
const router = express.Router();

const {
  index,
  viewCreate,
  actionCreate,
  actionDelete,
  viewEdit,
  actionEdit,
} = require("./controller");

const { isLoginAdmin } = require("../middleware");
router.use(isLoginAdmin);
router.get("/", index);
router.get("/tambah", viewCreate);
router.post("/tambah", actionCreate);
router.get("/edit/:id", viewEdit);
router.post("/edit", actionEdit);
router.post("/delete/:id", actionDelete);

module.exports = router;
