// WEB Routes

const CartController = require("../app/http/controllers/customers/CartController");
const HomeController = require("../app/http/controllers/HomeController");
const AuthController = require("../app/http/controllers/AuthController");

function initRoutes(app) {
  // Home route
  app.get("/", HomeController().index);
  // Cart route
  app.get("/cart", CartController().index);
  app.post("/update-cart", CartController().update);
  // Login route
  app.get("/login", AuthController().login);
  // Register route
  app.get("/register", AuthController().register);
  app.post("/register", AuthController().postRegister);
}

module.exports = initRoutes;
