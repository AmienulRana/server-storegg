const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema({
  type: {
    type: String,
    required: [true, "Tipe pembayaran harus diisi"],
  },
  status: {
    type: String,
    enum: ["Y", "N"],
    default: "Y",
  },
  banks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bank",
    },
  ],
});

module.exports = mongoose.model("payment", PaymentSchema);
