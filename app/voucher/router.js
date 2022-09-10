const express = require("express");
const router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  actionDelete,
  viewEdit,
  actionEdit,
  actionUpdateStatus,
} = require("./controller");

const upload = require("../../utils/upload");
const { isLoginAdmin } = require("../middleware");
router.use(isLoginAdmin);
router.get("/", index);
router.get("/tambah", viewCreate);
router.get("/update-status/:id?", actionUpdateStatus);
router.post("/tambah", upload.single("thumbnail"), actionCreate);
router.get("/edit/:id", viewEdit);
router.post("/edit", upload.single("thumbnail"), actionEdit);
router.post("/delete/:id", actionDelete);

module.exports = router;
