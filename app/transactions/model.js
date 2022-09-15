const mongoose = require("mongoose");

const TransactionShema = mongoose.Schema(
  {
    historyVoucherTopup: {
      gameName: { type: String, require: true },
      category: { type: String, require: true },
      thumbnail: { type: String, require: true },
      coinName: { type: String, require: true },
      coinQuantity: { type: String, require: true },
      price: { type: Number, require: true },
    },
    historyPayment: {
      name: { type: String, require: true },
      type: { type: String, require: true },
      bankName: { type: String, require: true },
      noRekening: { type: String, require: true },
    },
    name: {
      type: String,
      require: true,
    },
    usernameGame: {
      type: String,
      require: true,
    },
    accountUser: {
      type: String,
      require: true,
    },
    tax: {
      type: Number,
      require: true,
    },
    value: {
      type: Number,
      require: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
    },
    historyUser: {
      name: { type: String, require: [true, "Nama harus diisi"] },
      phoneNumber: {
        type: String,
        require: [true, "No.hp harus diisi"],
        maxLength: [13, "panjang karakter harus 9 - 13"],
        minLength: [9, "panjang karakter harus 9 - 13"],
      },
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaction", TransactionShema);
