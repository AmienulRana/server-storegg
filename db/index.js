const mongoose = require("mongoose");
const { MONGODB_URL } = require("../config");
mongoose
  .connect(MONGODB_URL, {
    useUnifiedTopology: true,
  })
  .then(() => {
    if (process.env.MODE === "prod") {
      console.log("success connected mongodb to cluster ");
    } else {
      console.log("mongodb success connected to local db");
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("failed mongodb connected");
  });
