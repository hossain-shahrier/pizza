const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
function AuthController() {
  return {
    login: function (req, res) {
      res.render("auth/login");
    },
    register: function (req, res) {
      res.render("auth/register");
    },
    logout: function (req, res) {
      req.logout();
      return res.redirect("/");
    },
    postRegister: async function (req, res) {
      const { name, email, password } = req.body;
      // Validate request
      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);
        return res.redirect("/register");
      }
      // Check for existing user
      User.exists({ email: email }, function (err, exists) {
        if (exists) {
          req.flash("error", "Email already exists");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      // Create user
      User({ name, email, password: hashedPassword }).save(function (
        err,
        user
      ) {
        res.redirect("/");
      });
    },
    postLogin: function (req, res, next) {
      const { email, password } = req.body;
      if (!email || !password) {
        req.flash("error", "All fields are required");
        req.flash("email", email);
        return res.redirect("/login");
      }
      passport.authenticate("local", (err, user, info) => {
        if (err) {
          req.flash("error", info.message);
          return next(err);
        }
        if (!user) {
          req.flash("error", info.message);
          return res.redirect("/login");
        }
        req.logIn(user, (err) => {
          if (err) {
            req.flash("error", info.message);
            return next(err);
          }
          return res.redirect("/");
        });
      })(req, res, next);
    },
  };
}
module.exports = AuthController;
