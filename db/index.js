const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config");
mongoose
  .connect(MONGODB_URL, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb success connected"))
  .catch((err) => {
    console.log(err);
    console.log("failed mongodb connected");
  });
