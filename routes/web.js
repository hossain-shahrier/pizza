// WEB Routes

const CartController = require("../app/http/controllers/customers/CartController");
const HomeController = require("../app/http/controllers/HomeController");
const AuthController = require("../app/http/controllers/AuthController");
const guest = require("../app/http/middlewares/guest");
const OrderController = require("../app/http/controllers/OrderController");
function initRoutes(app) {
  // Home route
  app.get("/", HomeController().index);
  // Cart route
  app.get("/cart", CartController().index);
  app.post("/update-cart", CartController().update);
  // Login route
  app.get("/login", guest, AuthController().login);
  app.post("/login", AuthController().postLogin);
  // Register route
  app.get("/register", guest, AuthController().register);
  app.post("/register", AuthController().postRegister);
  // Logout route
  app.post("/logout", AuthController().logout);
  // Orders route
  app.post("/orders", OrderController().store);
}

module.exports = initRoutes;
