// WEB Routes
const CartController = require("../app/http/controllers/customers/CartController");
const HomeController = require("../app/http/controllers/HomeController");
const AuthController = require("../app/http/controllers/AuthController");
const OrderController = require("../app/http/controllers/customers/OrderController");
const AdminOrderController = require("../app/http/controllers/admin/AdminOrderController");

// Middlewares
const guest = require("../app/http/middlewares/guest");
const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");
const StatusController = require("../app/http/controllers/admin/StatusController");

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
  // Customer route
  app.post("/orders", auth, OrderController().store);
  app.get("/customer/orders", auth, OrderController().index);
  app.get("/customer/orders/:id", auth, OrderController().show);
  // Admin route
  app.get("/admin/orders", admin, AdminOrderController().index);
  app.post("/admin/orders/status", admin, StatusController().update);
}

module.exports = initRoutes;
