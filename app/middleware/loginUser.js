const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = {
  authenticationToken: (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
      return res.status(401).json({
        message: "Please Login to get Access!!",
        auth: false,
      });
    }
    const token = header.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
      if (err) {
        return res.status(401).json({
          message: "Invalid Token!!",
          auth: false,
        });
      }
      req.player = decoded;
      next();
    });
    // next();
  },
};
