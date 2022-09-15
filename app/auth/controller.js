const Player = require("../player/model");
const bcrypt = require("bcrypt");
const generate_token = require("../../utils/generateToken");
module.exports = {
  signup: async (req, res, next) => {
    try {
      const { email } = req.body;

      const checkDuplicatePlayer = await Player.findOne({
        email,
      });
      if (checkDuplicatePlayer) {
        return res.status(422).json({ message: "Your email has ben declared" });
      }

      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const player = new Player({ ...req.body });
      await player.save();
      delete player._doc.password;
      res.status(200).json({ data: player, message: "Signup success" });
    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          message: err.message,
          fields: err.errors,
        });
      }
      next(err);
    }
  },
  signin: async (req, res) => {
    try {
      let { email, password } = req.body;
      const player = await Player.findOne({ email });
      if (player) {
        const data = {
          _id: player._id,
          username: player.username,
          email: player.email,
          avatar: player.avatar,
        };
        const cek_password = bcrypt.compareSync(password, player.password);
        console.log(cek_password);
        if (!cek_password)
          return res
            .status(442)
            .json({ message: "Your email or password is incorrect" });

        const jwt_result = await generate_token(data);
        return res
          .status(200)
          .json({
            error: false,
            message: "Authentication Sukses!",
            token: jwt_result,
          })
          .end();
      }
      return res.status(422).json({
        message: "Your email or password is incorrect",
      });
    } catch (err) {
      console.log("catch error", err);
      return res.status(422).json({
        message: err.message,
        fields: err.errors,
      });
    }
  },
};
