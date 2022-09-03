module.exports = {
  index: (req, res) => {
    try {
      res.render("index", { title: "tes" });
    } catch (err) {}
  },
};
