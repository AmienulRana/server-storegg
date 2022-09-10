const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const voucher = await Voucher.find()
        .populate("category")
        .populate("nominals");
      console.log(voucher);
      res.render("admin/voucher/view", { voucher, alert });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/create", { category, nominal });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionCreate: async (req, res) => {
    try {
      if (req.file) {
        const { filename } = req.file;
        const voucher = new Voucher({ ...req.body, thumbnail: filename });
        await voucher.save();
        req.flash("alertMessage", "Berhasil Menambahkan Voucher baru");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.deleteOne({ _id: id });
      req.flash("alertMessage", "Berhasil Menghapus voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await (
        await Voucher.findOne({ _id: id }).populate("nominals")
      ).populate("category");
      const category = await Category.find();
      const nominal = await Nominal.find();
      console.log(voucher);
      res.render("admin/voucher/edit", { voucher, category, nominal });
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.body;
      if (req.file) {
        const { filename } = req.file;
        const voucher = await Voucher.updateOne(
          { _id: id },
          {
            $set: {
              thumbnail: filename,
              ...req.body,
            },
          }
        );
        req.flash("alertMessage", "Berhasil Mengubah Voucher");
        req.flash("alertStatus", "success");
        res.redirect("/voucher");
      }

      req.flash("alertMessage", "Berhasil Mengubah voucher");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionUpdateStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let voucher = await Voucher.findOne({ _id: id });

      let status = voucher.status === "Y" ? "N" : "Y";

      voucher = await Voucher.findOneAndUpdate(
        {
          _id: id,
        },
        { status }
      );

      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (err) {
      req.flash("alertMessage", "Gagal ubah status");
      req.flash("alertStatus", "failed");
      res.redirect("/voucher");
    }
  },
};
