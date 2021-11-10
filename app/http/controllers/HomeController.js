function HomeController() {
  return {
    index: function (req, res) {
      res.render("home");
    },
  };
}
module.exports = HomeController;
