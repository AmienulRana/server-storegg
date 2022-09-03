const Users = require("./model");
const bcrypt = require("bcrypt");
module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      console.log(req.session.user);
      if (req.session.user) {
        res.redirect("/dashboard");
      } else {
        res.render("admin/user/view", { alert });
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkUser = await Users.findOne({ email });
      if (checkUser) {
        if (checkUser.status === "Y") {
          const checkPassword = await bcrypt.compare(
            password,
            checkUser.password
          );
          if (checkPassword) {
            req.session.user = {
              _id: checkUser._id,
              email: checkUser.email,
              status: checkUser.status,
              name: checkUser.name,
            };

            res.redirect("/dashboard");
          } else {
            req.flash("alertMessage", "Kata sandi yang anda inputkan salah");
            req.flash("alertStatus", "danger");
            res.redirect("/");
          }
        } else {
          req.flash("alertMessage", "Mohon maaf status akun anda belum aktif");
          req.flash("alertStatus", "danger");
          res.redirect("/");
        }
      } else {
        req.flash("alertMessage", "Email Yang anda inputkan salah");
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  handleLogout: (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
