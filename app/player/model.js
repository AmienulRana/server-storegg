const mongoose = require("mongoose");

const PlayerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },
    username: {
      type: String,
      require: [true, "Username Harus Diisi"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
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
    avatar: { type: String, default: "-" },
    favorite: { type: mongoose.Schema.Types.ObjectId, ref: "category" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("player", PlayerSchema);
