const mongoose = require("mongoose");

const CategoryShema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Kategori wajib diisi"],
  },
});

module.exports = mongoose.model("category", CategoryShema);
