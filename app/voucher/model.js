const mongoose = require("mongoose");

const VoucherShema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama Game Harus Diisi"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  nominals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "nominal",
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("voucher", VoucherShema);
