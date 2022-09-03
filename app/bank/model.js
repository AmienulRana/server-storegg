const mongoose = require("mongoose");

const BankSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama Pemilik harus diisi"],
  },
  bankName: {
    type: String,
    required: [true, "Nama Bank Harus Diisi"],
  },
  noRekening: {
    type: String,
    required: [true, "No Rekening Harus diisi"],
  },
});

module.exports = mongoose.model("bank", BankSchema);
