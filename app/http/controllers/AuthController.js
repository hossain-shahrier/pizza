function AuthController() {
  return {
    login: function (req, res) {
      res.render("auth/login");
    },
    register: function (req, res) {
      res.render("auth/register");
    },
    logout: function (req, res) {
      res.render("logout");
    },
  };
}
module.exports = AuthController;
