const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "Nama Harus Diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "admin",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    password: {
      type: String,
      require: [true, "Password Harus Diisi"],
    },
    phoneNumber: {
      type: String,
      require: [true, "No Hp harus Diisi"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
